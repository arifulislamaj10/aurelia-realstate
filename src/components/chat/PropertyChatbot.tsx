"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { agency } from "@/data/agency";
import { CONTACT_EMAIL } from "@/data/creator";
import { filterProperties, properties } from "@/data/properties";
import { buildEnquiryEmail, getTierLabel, qualifyLead } from "@/lib/leadQualification";
import { cn, formatPrice } from "@/lib/utils";
import {
  ChatMessage,
  LeadIntent,
  LeadProfile,
  LeadTier,
  LeadTimeline,
  QuickReply,
} from "@/types/chatbot";

type Step =
  | "welcome"
  | "intent"
  | "search"
  | "location"
  | "timeline"
  | "budget"
  | "property"
  | "details-name"
  | "details-email"
  | "details-message"
  | "done";

const INTENT_REPLIES: QuickReply[] = [
  { value: "search", label: "Search properties" },
  { value: "buy", label: "Buy a property" },
  { value: "rent", label: "Rent a property" },
  { value: "viewing", label: "Book a viewing" },
  { value: "sell", label: "Sell my property" },
  { value: "general", label: "General enquiry" },
];

const LOCATION_REPLIES: QuickReply[] = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "other", label: "Other / Worldwide" },
  { value: "not-sure", label: "Not sure yet" },
];

const TIMELINE_REPLIES: QuickReply[] = [
  { value: "asap", label: "ASAP / within 30 days" },
  { value: "1-3months", label: "1 to 3 months" },
  { value: "3-6months", label: "3 to 6 months" },
  { value: "exploring", label: "Just exploring" },
];

const SALE_BUDGET_REPLIES: QuickReply[] = [
  { value: "under-5m", label: "Under ₱5M" },
  { value: "5m-10m", label: "₱5M to ₱10M" },
  { value: "10m-15m", label: "₱10M to ₱15M" },
  { value: "15m-plus", label: "₱15M+" },
  { value: "not-sure", label: "Not sure yet" },
];

const RENT_BUDGET_REPLIES: QuickReply[] = [
  { value: "under-30k", label: "Under ₱30,000 / mo" },
  { value: "30k-50k", label: "₱30,000 to ₱50,000 / mo" },
  { value: "50k-plus", label: "₱50,000+ / mo" },
  { value: "not-sure", label: "Not sure yet" },
];

function tierStyles(tier: LeadTier) {
  switch (tier) {
    case "hot":
      return "bg-red-500/15 text-red-700 border-red-200";
    case "warm":
      return "bg-amber-500/15 text-amber-800 border-amber-200";
    case "cold":
      return "bg-slate-500/10 text-slate-600 border-slate-200";
  }
}

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function BotIcon({ className }: { className?: string }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M12 2v2M8 4l1 1.5M16 4l-1 1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect x="5" y="7" width="14" height="11" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 12h2M19 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="9.5" cy="12" r="1.25" fill="currentColor" />
      <circle cx="14.5" cy="12" r="1.25" fill="currentColor" />
      <path d="M9.5 15.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 20h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function matchReply(text: string, replies: QuickReply[]) {
  const normalized = text.trim().toLowerCase();
  return replies.find(
    (r) =>
      r.value === normalized ||
      r.label.toLowerCase() === normalized ||
      normalized.includes(r.label.toLowerCase()) ||
      r.label.toLowerCase().includes(normalized)
  );
}

function parseIntent(text: string): QuickReply | undefined {
  const t = text.toLowerCase();
  if (t.includes("search") || t.includes("find") || t.includes("look for")) {
    return INTENT_REPLIES[0];
  }
  if (t.includes("rent")) return INTENT_REPLIES[2];
  if (t.includes("view")) return INTENT_REPLIES[3];
  if (t.includes("sell")) return INTENT_REPLIES[4];
  if (t.includes("buy")) return INTENT_REPLIES[1];
  return matchReply(text, INTENT_REPLIES.slice(1));
}

function composerPlaceholder(step: Step) {
  switch (step) {
    case "intent":
      return "Type a message or tap a reply…";
    case "search":
      return "Search city, area, or property name…";
    case "location":
      return "Which market? Type or tap a reply…";
    case "timeline":
      return "When do you want to move?";
    case "budget":
      return "Your budget range…";
    case "property":
      return "Property name or area…";
    case "details-name":
      return "Your name…";
    case "details-email":
      return "Your email…";
    case "details-message":
      return "Any extra details? (optional)";
    case "done":
      return "Ask another question…";
    default:
      return "Type a message…";
  }
}

export function PropertyChatbot() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("welcome");
  const [profile, setProfile] = useState<LeadProfile>({});
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const [composer, setComposer] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const startChatRef = useRef<() => void>(() => {});

  const pageProperty = useMemo(() => {
    const match = pathname.match(/^\/properties\/([^/]+)/);
    if (!match) return null;
    return properties.find((p) => p.slug === match[1]) ?? null;
  }, [pathname]);

  const activeQuickReplies = useMemo(() => {
    const lastBot = [...messages].reverse().find((m) => m.role === "bot" && m.quickReplies);
    if (!lastBot?.quickReplies || lastBot.quickRepliesUsed) return null;
    return lastBot.quickReplies;
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  function pushBot(message: Omit<ChatMessage, "id" | "role">) {
    setMessages((prev) => [
      ...prev.map((m) =>
        m.quickReplies && !m.quickRepliesUsed ? { ...m, quickRepliesUsed: true } : m
      ),
      { id: uid(), role: "bot", ...message },
    ]);
  }

  function pushUser(text: string) {
    setMessages((prev) => [...prev, { id: uid(), role: "user", text }]);
  }

  function markQuickReplyUsed() {
    setMessages((prev) =>
      prev.map((m) => (m.quickReplies && !m.quickRepliesUsed ? { ...m, quickRepliesUsed: true } : m))
    );
  }

  async function botReply(message: Omit<ChatMessage, "id" | "role">) {
    setTyping(true);
    await new Promise((r) => setTimeout(r, 550));
    setTyping(false);
    pushBot(message);
  }

  async function askIntent() {
    await botReply({
      text: "What would you like to do today?",
      quickReplies: INTENT_REPLIES,
    });
    setStep("intent");
  }

  async function startChat() {
    setOpen(true);
    if (messages.length > 0) return;

    await botReply({
      text: `Hi! I'm the ${agency.shortName} AI assistant.\n\nI can search listings, answer property questions, and qualify your enquiry so our team knows who to help first.`,
    });

    if (pageProperty) {
      await botReply({
        text: `I can see you're viewing ${pageProperty.title} in ${pageProperty.city}. I can help with this listing or anything else.`,
      });
      setProfile((p) => ({ ...p, propertyInterest: pageProperty.title }));
    }

    await askIntent();
  }

  startChatRef.current = () => {
    void startChat();
  };

  useEffect(() => {
    function onOpenChat() {
      startChatRef.current();
    }
    window.addEventListener("open-aurelia-chat", onOpenChat);
    return () => window.removeEventListener("open-aurelia-chat", onOpenChat);
  }, []);

  async function askLocation() {
    await botReply({
      text: "Which market are you most interested in?",
      quickReplies: LOCATION_REPLIES,
    });
    setStep("location");
  }

  async function askTimeline(nextProfile: LeadProfile) {
    void nextProfile;
    await botReply({
      text: "When are you hoping to buy, rent, or move?",
      quickReplies: TIMELINE_REPLIES,
    });
    setStep("timeline");
  }

  async function askBudget(nextProfile: LeadProfile) {
    const text =
      nextProfile.intent === "rent"
        ? "What's your monthly budget?"
        : nextProfile.intent === "sell"
          ? "What price range are you hoping to achieve?"
          : "What's your budget range?";
    await botReply({
      text,
      quickReplies: nextProfile.intent === "rent" ? RENT_BUDGET_REPLIES : SALE_BUDGET_REPLIES,
    });
    setStep("budget");
  }

  async function askProperty() {
    const picks = properties.slice(0, 4).map((p) => ({ value: p.title, label: p.title }));
    await botReply({
      text: "Is there a specific listing you'd like to ask about? Type to search, or pick one below.",
      quickReplies: [...picks, { value: "none", label: "No specific property yet" }],
    });
    setStep("property");
  }

  async function askName() {
    await botReply({ text: "Almost done — what's your name?" });
    setStep("details-name");
  }

  async function askEmail(name: string) {
    await botReply({ text: `Thanks, ${name}. What's the best email to reach you?` });
    setStep("details-email");
  }

  async function askOptionalMessage() {
    await botReply({
      text: "Any extra details you'd like our team to know? (Optional — type skip to continue.)",
    });
    setStep("details-message");
  }

  async function runSearch(query: string) {
    const results = filterProperties({ query: query || undefined });

    if (results.length === 0) {
      await botReply({
        text: `I couldn't find anything for "${query}". Try another city or property name, or type menu to see other options.`,
      });
      setStep("search");
      return;
    }

    await botReply({
      text: `Here ${results.length === 1 ? "is" : "are"} ${results.length} ${results.length === 1 ? "match" : "matches"} for "${query}":`,
      searchResults: {
        query,
        items: results.slice(0, 5).map((p) => ({
          id: p.id,
          slug: p.slug,
          title: p.title,
          city: p.city,
          bedrooms: p.bedrooms,
          priceLabel: formatPrice(p.price, p.status, p.state),
        })),
      },
    });

    await botReply({
      text: "Tap Enquire on a listing, or type another search. Type menu to go back.",
    });
    setStep("search");
  }

  async function finishEnquiry(nextProfile: LeadProfile) {
    const result = qualifyLead(nextProfile);
    setProfile(nextProfile);

    await botReply({
      text: `Thanks ${nextProfile.name}! Based on your answers, you're a ${getTierLabel(result.tier)} (${result.score}/100).\n\n${result.summary}\n\nOur team will reply within 48 hours.`,
      tier: result.tier,
      qualification: result,
    });
    setStep("done");
  }

  async function handleIntent(value: string, label: string) {
    if (value === "search") {
      await botReply({
        text: "Sure — what are you looking for? Type a city, area, or property name.",
      });
      setStep("search");
      return;
    }

    const intent = value as LeadIntent;
    const ack: Record<string, string> = {
      buy: "Great — you're looking to buy.",
      rent: "Got it — you need a rental.",
      viewing: "Perfect — let's get a viewing booked.",
      sell: "Understood — you want to sell a property.",
      general: "No problem — tell me what you need and I'll guide you.",
    };

    setProfile((p) => ({ ...p, intent }));
    await botReply({ text: ack[intent] ?? "Got it." });
    await askLocation();
  }

  async function handleLocation(value: string, label: string) {
    const next = { ...profile, location: value };
    setProfile(next);
    await botReply({ text: `Noted — ${label}.` });
    await askTimeline(next);
  }

  async function handleTimeline(value: LeadTimeline, label: string) {
    const next = { ...profile, timeline: value };
    setProfile(next);
    await botReply({ text: `Timeline: ${label}.` });
    await askBudget(next);
  }

  async function handleBudget(value: string, label: string) {
    const next = { ...profile, budget: value };
    setProfile(next);
    await botReply({ text: `Budget noted: ${label}.` });

    if (!pageProperty && (!next.propertyInterest || next.propertyInterest === "none")) {
      await askProperty();
    } else {
      await askName();
    }
  }

  async function handleProperty(value: string, label: string) {
    const next = {
      ...profile,
      propertyInterest: value === "none" ? undefined : value,
    };
    setProfile(next);
    if (value === "none") {
      await botReply({ text: "No problem — we'll keep options open." });
    } else {
      await botReply({ text: `I'll note your interest in ${label}.` });
    }
    await askName();
  }

  async function handleSearchEnquire(title: string) {
    pushUser(`Enquire about ${title}`);
    markQuickReplyUsed();
    const next = {
      ...profile,
      propertyInterest: title,
      intent: profile.intent ?? ("buy" as LeadIntent),
    };
    setProfile(next);
    await botReply({ text: `I'll help you enquire about ${title}.` });

    if (!profile.location) {
      await askLocation();
    } else if (!profile.timeline) {
      await askTimeline(next);
    } else if (!profile.budget) {
      await askBudget(next);
    } else {
      await askName();
    }
  }

  async function processInput(raw: string) {
    const text = raw.trim();
    if (!text) return;

    pushUser(text);
    setComposer("");
    markQuickReplyUsed();

    if (text.toLowerCase() === "menu" || text.toLowerCase() === "start over") {
      setProfile({});
      await botReply({ text: "No problem — let's start again." });
      await askIntent();
      return;
    }

    if (step === "done") {
      if (text.toLowerCase().includes("search")) {
        await botReply({ text: "What would you like to search for?" });
        setStep("search");
      } else {
        await botReply({
          text: "I can search listings, start a new enquiry, or you can book a viewing on the site. Type menu to restart.",
        });
      }
      return;
    }

    if (step === "intent") {
      const intent = parseIntent(text);
      if (intent) {
        await handleIntent(intent.value, intent.label);
      } else if (text.length > 2) {
        await botReply({ text: "I'll search our listings for you." });
        setStep("search");
        await runSearch(text);
      } else {
        await botReply({
          text: "Pick an option below or tell me if you want to buy, rent, sell, or search.",
          quickReplies: INTENT_REPLIES,
        });
      }
      return;
    }

    if (step === "search") {
      await runSearch(text);
      return;
    }

    if (step === "location") {
      const match = matchReply(text, LOCATION_REPLIES);
      if (match) await handleLocation(match.value, match.label);
      else {
        await botReply({
          text: "I didn't catch that market — please pick one or type United States, UK, or Canada.",
          quickReplies: LOCATION_REPLIES,
        });
      }
      return;
    }

    if (step === "timeline") {
      const match = matchReply(text, TIMELINE_REPLIES);
      if (match) await handleTimeline(match.value as LeadTimeline, match.label);
      else {
        await botReply({
          text: "When works for you? Pick a timeline below or type your answer.",
          quickReplies: TIMELINE_REPLIES,
        });
      }
      return;
    }

    if (step === "budget") {
      const replies = profile.intent === "rent" ? RENT_BUDGET_REPLIES : SALE_BUDGET_REPLIES;
      const match = matchReply(text, replies);
      if (match) await handleBudget(match.value, match.label);
      else {
        await handleBudget(text.toLowerCase().replace(/\s+/g, "-"), text);
      }
      return;
    }

    if (step === "property") {
      if (text.toLowerCase() === "none" || text.toLowerCase().includes("no specific")) {
        await handleProperty("none", "No specific property yet");
        return;
      }
      const exact = properties.find((p) => p.title.toLowerCase() === text.toLowerCase());
      if (exact) {
        await handleProperty(exact.title, exact.title);
        return;
      }
      await runSearch(text);
      return;
    }

    if (step === "details-name") {
      const next = { ...profile, name: text };
      setProfile(next);
      await askEmail(text);
      return;
    }

    if (step === "details-email") {
      if (!text.includes("@")) {
        await botReply({ text: "That doesn't look like an email — please try again." });
        return;
      }
      const next = { ...profile, email: text };
      setProfile(next);
      await askOptionalMessage();
      return;
    }

    if (step === "details-message") {
      const next = {
        ...profile,
        message: text.toLowerCase() === "skip" ? undefined : text,
      };
      await finishEnquiry(next);
    }
  }

  async function handleQuickReply(value: string, label: string) {
    pushUser(label);
    markQuickReplyUsed();
    setComposer("");

    if (step === "intent") await handleIntent(value, label);
    else if (step === "location") await handleLocation(value, label);
    else if (step === "timeline") await handleTimeline(value as LeadTimeline, label);
    else if (step === "budget") await handleBudget(value, label);
    else if (step === "property") await handleProperty(value, label);
  }

  function resetChat() {
    setStep("welcome");
    setProfile({});
    setMessages([]);
    setComposer("");
  }

  const lastQualification = [...messages].reverse().find((m) => m.qualification)?.qualification;
  const mailto =
    lastQualification && profile.email
      ? buildEnquiryEmail(profile, lastQualification).replace(
          "mailto:?",
          `mailto:${CONTACT_EMAIL}?`
        )
      : `mailto:${CONTACT_EMAIL}`;

  return (
    <>
      <button
        type="button"
        onClick={() => (open ? setOpen(false) : startChat())}
        className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-gradient-to-br from-primary via-primary to-primary-soft text-foreground-light shadow-lg shadow-black/25 transition-transform hover:scale-105 sm:bottom-6 sm:right-6"
        aria-label={open ? "Close AI assistant" : "Open AI property assistant"}
      >
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 rounded-full bg-accent px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary shadow-sm">
            AI
          </span>
        )}
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        ) : (
          <BotIcon className="transition-transform group-hover:scale-105" />
        )}
      </button>

      {open && (
        <div className="fixed bottom-24 right-4 z-50 flex w-[min(100vw-2rem,380px)] flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-2xl shadow-black/15 sm:right-6">
          <div className="flex items-center gap-3 border-b border-border bg-primary px-4 py-3 text-foreground-light">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/15 text-accent-light">
              <BotIcon />
            </div>
            <div>
              <p className="text-sm font-semibold">{agency.name} AI</p>
              <p className="text-xs text-white/60">
                {typing ? "Typing…" : "Online · Search & enquiries"}
              </p>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex max-h-[min(52vh,380px)] flex-1 flex-col gap-3 overflow-y-auto bg-[#f7f5f1] p-4"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm",
                    msg.role === "bot"
                      ? "rounded-bl-md bg-white text-foreground"
                      : "rounded-br-md bg-primary text-foreground-light"
                  )}
                >
                  {msg.tier && msg.role === "bot" && (
                    <span
                      className={cn(
                        "mb-2 inline-block rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest",
                        tierStyles(msg.tier)
                      )}
                    >
                      {getTierLabel(msg.tier)}
                    </span>
                  )}
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {msg.searchResults && (
                    <div className="mt-3 space-y-2">
                      {msg.searchResults.items.map((property) => (
                        <div
                          key={property.id}
                          className="rounded-xl border border-border bg-background/80 p-2.5"
                        >
                          <p className="text-sm font-medium text-primary">{property.title}</p>
                          <p className="text-xs text-muted">
                            {property.city} · {property.bedrooms} bed · {property.priceLabel}
                          </p>
                          <div className="mt-2 flex gap-2">
                            <Link
                              href={`/properties/${property.slug}`}
                              className="flex-1 rounded-full border border-border py-1 text-center text-[11px] font-medium"
                            >
                              View
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleSearchEnquire(property.title)}
                              className="flex-1 rounded-full bg-accent py-1 text-[11px] font-medium text-primary"
                            >
                              Enquire
                            </button>
                          </div>
                        </div>
                      ))}
                      {msg.searchResults.items.length >= 5 && (
                        <Link
                          href={`/properties?q=${encodeURIComponent(msg.searchResults.query)}`}
                          className="block text-center text-xs font-medium text-accent"
                        >
                          View all on site →
                        </Link>
                      )}
                    </div>
                  )}

                  {msg.qualification && (
                    <div className="mt-3 space-y-2 border-t border-border pt-3">
                      <ul className="space-y-1 text-xs text-muted">
                        {msg.qualification.reasons.map((r) => (
                          <li key={r}>· {r}</li>
                        ))}
                      </ul>
                      <a
                        href={mailto}
                        className="block rounded-full bg-accent py-2 text-center text-xs font-medium text-primary"
                      >
                        Send enquiry by email
                      </a>
                      <Link
                        href="/book-viewing"
                        className="block rounded-full border border-border py-2 text-center text-xs font-medium text-primary"
                      >
                        Book a viewing
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          resetChat();
                          void startChat();
                        }}
                        className="w-full text-xs text-muted underline"
                      >
                        Start new chat
                      </button>
                    </div>
                  )}

                  {msg.role === "bot" && msg.quickReplies && !msg.quickRepliesUsed && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {msg.quickReplies.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleQuickReply(opt.value, opt.label)}
                          className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-left text-xs font-medium text-primary transition-colors hover:bg-accent/20"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void processInput(composer);
            }}
            className="border-t border-border bg-white p-3"
          >
            {activeQuickReplies && step !== "intent" && (
              <div className="mb-2 flex gap-1.5 overflow-x-auto pb-1">
                {activeQuickReplies.slice(0, 4).map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleQuickReply(opt.value, opt.label)}
                    className="shrink-0 rounded-full border border-border px-2.5 py-1 text-[11px] text-primary"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                value={composer}
                onChange={(e) => setComposer(e.target.value)}
                placeholder={composerPlaceholder(step)}
                className="glass-input min-w-0 flex-1 rounded-full px-4 py-2.5 text-sm"
              />
              <button
                type="submit"
                disabled={!composer.trim() || typing}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-foreground-light disabled:opacity-40"
                aria-label="Send message"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12h12M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
