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
          "Apna naap kaise lein aur Mohini Creation ke saath share karein, ya fitting appointment poochhein.",
      },
      { property: "og:title", content: "Measurement Guide — Mohini Creation" },
      {
        property: "og:description",
        content:
          "Apna naap kaise lein aur Mohini Creation ke saath share karein, ya fitting appointment poochhein.",
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
        title="Naap kaise share karein"
        text="Ek fitting wala outfit ya measuring tape se naap lein. Neeche diye guide aur list ki madad lein."
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
          <h2 className="font-display text-2xl">Ye naap chahiye</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {measurements.map((m) => (
              <li key={m} className="rounded-md border border-border bg-card px-3 py-2 text-sm">
                {m}
              </li>
            ))}
          </ul>
          <p className="mt-6 rounded-md bg-accent p-4 text-sm text-accent-foreground">
            Online bheja gaya naap apne aap verify nahi hota. Order lene se pehle designer naap
            confirm kar sakti hai ya fitting arrange kar sakti hai.
          </p>
          <a
            href={whatsappLink(
              "Namaste, mujhe measurement appointment ke baare mein poochhna hai.",
            )}
            target="_blank"
            rel="noreferrer"
            className="btn-primary mt-6"
          >
            <MessageCircle className="h-4 w-4" />
            Measurement appointment poochhein
          </a>
        </div>
      </div>
    </>
  );
}
