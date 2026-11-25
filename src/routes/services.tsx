import { createFileRoute, Link } from "@tanstack/react-router";
import { services } from "@/content/site";
import { PageHeader } from "@/components/site/Layout";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Mohini Creation" },
      {
        name: "description",
        content:
          "Designer blouses, bridal & festive lehengas, Alia-cut suits, kids custom outfits, and alterations by Mohini Creation.",
      },
      { property: "og:title", content: "Services — Mohini Creation" },
      {
        property: "og:description",
        content:
          "Custom stitching, bridal blouses, lehengas, suits, and kids ethnic wear by Mohini Creation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHeader
        title="What we craft"
        text="Pricing is confirmed directly by the designer based on your design, embroidery work, and fabric."
      />
      <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <article
            key={s.name}
            className="flex flex-col overflow-hidden rounded-xl border border-border bg-card"
          >
            {s.image && (
              <img
                src={s.image}
                alt={s.name}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover object-top"
              />
            )}
            <div className="flex flex-1 flex-col p-5">
              <h2 className="font-display text-2xl font-semibold">{s.name}</h2>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                {s.description}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link to="/enquiry" search={{ service: s.name }} className="btn-primary">
                  Enquire now
                </Link>
                {s.category && (
                  <Link to="/gallery" search={{ category: s.category }} className="btn-outline">
                    View designs
                  </Link>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
