import { Suspense } from "react";
import { ViewingBookingForm } from "@/components/forms/ViewingBookingForm";
import { properties } from "@/data/properties";

interface BookViewingPageProps {
  searchParams: Promise<{ property?: string }>;
}

export default async function BookViewingPage({ searchParams }: BookViewingPageProps) {
  const params = await searchParams;

  const points = [
    {
      title: "Choose Your Time",
      text: "Flexible slots that fit around your schedule.",
    },
    {
      title: "Rapid Confirmation",
      text: "Agents are notified instantly and confirm within hours.",
    },
    {
      title: "Qualified Enquiries",
      text: "Every booking captures the details agents need to follow up.",
    },
  ];

  return (
    <div className="page-top bg-background pb-16 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="label-luxury text-accent">Private Viewings</p>
            <h1 className="headline-editorial mt-3 text-3xl text-primary sm:text-4xl lg:text-5xl">
              Arrange your <em>personal</em> viewing
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:mt-5 sm:text-base">
              Choose a property, pick a date, and our team confirms within hours.
              Simple for buyers. Less admin for agents.
            </p>

            <div className="mt-8 space-y-4 sm:mt-10">
              {points.map((item) => (
                <div key={item.title} className="glass-card rounded-2xl p-5">
                  <p className="font-display text-lg text-primary">{item.title}</p>
                  <p className="mt-1 text-sm text-muted">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 sm:p-8">
            <p className="label-luxury text-accent">Booking Request</p>
            <h2 className="mt-2 font-display text-xl text-primary sm:text-2xl">Schedule a viewing</h2>
            <p className="mt-1 text-sm text-muted">Complete the form and we will confirm by email.</p>
            <div className="mt-5 sm:mt-6">
              <Suspense fallback={<div className="h-64 rounded-xl bg-border" />}>
                <ViewingBookingForm
                  properties={properties}
                  preselectedPropertyId={params.property}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
