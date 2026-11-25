import { createFileRoute, Link } from "@tanstack/react-router";
import { Instagram, MessageCircle } from "lucide-react";
import { site, whatsappLink } from "@/content/site";
import { PageHeader } from "@/components/site/Layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Mohini Creation" },
      {
        name: "description",
        content:
          "About Creation By Mohini (@mohini_creation15) — bridal blouses, lehengas, Alia-cut suits, and kids custom tailoring.",
      },
      { property: "og:title", content: "About — Mohini Creation" },
      {
        property: "og:description",
        content:
          "About Creation By Mohini — custom designer stitching and fine hand-finished detailing.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHeader
        title={site.signature}
        text="Personal custom stitching studio — every outfit is crafted around your measurements and occasion."
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:items-center">
        <img
          src={site.images.studio}
          alt="Fabric and measuring tape on the stitching table"
          width={1536}
          height={1024}
          loading="lazy"
          className="aspect-[3/2] w-full rounded-xl object-cover shadow-card"
        />
        <div className="space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          <p>{site.intro}</p>
          <p>
            From bridal and heavy-work blouses with scalloped pearl borders, handmade dori latkans,
            and clean princess-cut fitting to everyday Alia-cut suits, flared twirl lehengas, and
            kids frocks with matching scrunchies — every detail is hand-finished with care.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link to="/gallery" className="btn-primary">
              View Gallery
            </Link>
            <a href={site.instagramUrl} target="_blank" rel="noreferrer" className="btn-outline">
              <Instagram className="h-4 w-4" />@{site.instagramHandle}
            </a>
            <a
              href={whatsappLink(
                "Hello Mohini Creation, I would like to discuss custom stitching.",
              )}
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
