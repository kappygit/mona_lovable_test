import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Instagram } from "lucide-react";
import { site, whatsappLink } from "@/content/site";
import { PageHeader } from "@/components/site/Layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Mohini Creation" },
      {
        name: "description",
        content: "WhatsApp ya Instagram par Mohini Creation se sampark karein.",
      },
      { property: "og:title", content: "Contact — Mohini Creation" },
      {
        property: "og:description",
        content: "WhatsApp ya Instagram par Mohini Creation se sampark karein.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const rows = [
    ["Phone", site.phoneDisplay],
    ["Email", site.email],
    ["Service area", site.serviceArea],
    ["Working hours", site.workingHours],
  ].filter(([, v]) => v);
  return (
    <>
      <PageHeader eyebrow="Contact" title="Baat karein" text="WhatsApp sabse aasaan tareeka hai." />
      <div className="mx-auto max-w-2xl px-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappLink("Namaste Mohini Creation!")}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <a href={site.instagramUrl} target="_blank" rel="noreferrer" className="btn-outline">
            <Instagram className="h-4 w-4" />@{site.instagramHandle}
          </a>
        </div>
        <dl className="mt-8 divide-y divide-border border-y border-border">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 py-3">
              <dt className="text-muted-foreground">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm text-muted-foreground">
          Final availability aur order details seedha designer ke saath confirm hoti hain.
        </p>
      </div>
    </>
  );
}
