import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { site, measurements, whatsappLink } from "@/content/site";
import { PageHeader, VideoSlot } from "@/components/site/Layout";

export const Route = createFileRoute("/measurements")({
  head: () => ({
    meta: [
      { title: "Measurement Guide — Mohini Creation" },
      {
        name: "description",
        content:
          "Learn how to measure and share your size with Mohini Creation, or request a fitting appointment.",
      },
      { property: "og:title", content: "Measurement Guide — Mohini Creation" },
      {
        property: "og:description",
        content:
          "Learn how to measure and share your size with Mohini Creation, or request a fitting appointment.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Guide,
});

function Guide() {
  return (
    <>
      <PageHeader
        title="How to share measurements"
        text="Measure using a well-fitting garment or a measuring tape. Follow the guide and checklist below."
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[auto_1fr]">
        <VideoSlot
          src={site.measurementVideo}
          poster={site.images.studio}
          instagramUrl={site.instagramReelsUrl}
          label="Measurement Guide"
          vertical
        />
        <div>
          <h2 className="font-display text-2xl">Measurements needed</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {measurements.map((m) => (
              <li key={m} className="rounded-md border border-border bg-card px-3 py-2 text-sm">
                {m}
              </li>
            ))}
          </ul>
          <p className="mt-6 rounded-md bg-accent p-4 text-sm text-accent-foreground">
            Submitted measurements are not automatically verified online. Before confirming your
            order, the designer may review them with you or arrange a fitting.
          </p>
          <a
            href={whatsappLink("Hello, I would like to ask about a measurement appointment.")}
            target="_blank"
            rel="noreferrer"
            className="btn-primary mt-6"
          >
            <MessageCircle className="h-4 w-4" />
            Request a measurement appointment
          </a>
        </div>
      </div>
    </>
  );
}
