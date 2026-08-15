"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { agency } from "@/data/agency";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About" },
  { href: "/news", label: "News" },
  { href: "/sell", label: "Sell" },
  { href: "/contact", label: "Contact" },
];

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function NavDivider({ light }: { light?: boolean }) {
  return (
    <span
      className={cn(
        "hidden h-6 w-px shrink-0 md:block",
        light ? "bg-white/20" : "bg-border"
      )}
      aria-hidden="true"
    />
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const overHero = isHome && !scrolled && !mobileOpen;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4 lg:px-8">
      <div
        className={cn(
          "mx-auto max-w-7xl overflow-hidden rounded-2xl border transition-all duration-300",
          overHero
            ? "border-white/20 bg-black/30 shadow-lg shadow-black/10 backdrop-blur-md"
            : "glass-light border-border/80 bg-white/85 shadow-md shadow-black/5"
        )}
      >
        <div className="flex items-center justify-between gap-3 px-3 py-2.5 sm:gap-4 sm:px-4 sm:py-3 lg:px-5">
          {/* Logo — flex-1 + min-w-0 on mobile so long text truncates and hamburger stays visible */}
          <Link
            href="/"
            className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden sm:gap-3 md:flex-none"
          >
            <div
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border sm:h-10 sm:w-10",
                overHero
                  ? "border-white/25 bg-white/10 text-foreground-light"
                  : "border-accent/25 bg-accent/8 text-accent"
              )}
            >
              <span className="font-display text-base font-semibold leading-none sm:text-lg">A</span>
            </div>
            <div className="min-w-0 overflow-hidden">
              <span
                className={cn(
                  "block truncate font-display text-base font-medium leading-tight sm:text-lg md:text-xl",
                  overHero ? "text-foreground-light" : "text-primary"
                )}
              >
                <span className="sm:hidden">{agency.shortName}</span>
                <span className="hidden sm:inline">{agency.name}</span>
              </span>
              <p
                className={cn(
                  "label-luxury hidden truncate text-[0.6875rem] sm:block",
                  overHero ? "text-white/45" : "text-muted"
                )}
              >
                {agency.tagline}
              </p>
            </div>
          </Link>

          <NavDivider light={overHero} />

          {/* Desktop links — grouped and separated from logo + CTA */}
          <nav
            className={cn(
              "hidden flex-1 items-center justify-center gap-1 rounded-xl px-1 py-1 md:flex",
              overHero ? "bg-white/5" : "bg-background/60"
            )}
            aria-label="Main navigation"
          >
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-4 py-2 text-sm font-medium tracking-wide transition-colors",
                    overHero
                      ? active
                        ? "bg-white/15 text-foreground-light"
                        : "text-white/65 hover:bg-white/10 hover:text-foreground-light"
                      : active
                        ? "bg-white text-primary shadow-sm"
                        : "text-muted hover:bg-white/70 hover:text-primary"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <NavDivider light={overHero} />

          {/* CTA + mobile toggle */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <div className="hidden md:block">
              <Button
                href="/book-viewing"
                size="sm"
                variant={overHero ? "glass" : "primary"}
              >
                Book Viewing
              </Button>
            </div>

            <button
              type="button"
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl border transition-colors md:hidden",
                overHero
                  ? "border-white/20 bg-white/10 text-foreground-light"
                  : "border-border bg-white text-primary"
              )}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <MenuIcon open={mobileOpen} />
            </button>
          </div>
        </div>

        {/* Mobile menu — clearly separated panel below the bar */}
        {mobileOpen && (
          <div
            className={cn(
              "border-t md:hidden",
              overHero ? "border-white/15 bg-black/20" : "border-border bg-background/40"
            )}
          >
            <nav className="flex flex-col gap-1 p-3 sm:p-4" aria-label="Mobile navigation">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-xl px-4 py-3 text-sm font-medium tracking-wide",
                      active
                        ? "bg-white text-primary shadow-sm"
                        : overHero
                          ? "text-white/75 hover:bg-white/10"
                          : "text-muted hover:bg-white/80 hover:text-primary"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="mt-2 border-t border-border/60 pt-3">
                <Button href="/book-viewing" size="sm" className="w-full">
                  Book Viewing
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
