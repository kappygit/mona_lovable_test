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
          "Creation By Mohini (@mohini_creation15) ke baare mein — bridal blouses, lehengas, Alia-cut suits aur kids custom tailoring.",
      },
      { property: "og:title", content: "About — Mohini Creation" },
      {
        property: "og:description",
        content: "Creation By Mohini ke baare mein — custom designer stitching aur fine finishing.",
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
        text="Personal custom stitching studio — jahan har outfit aapke naap aur occasion ke hisaab se banta hai."
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:items-center">
        <img
          src={site.images.studio}
          alt="Stitching table par fabric aur measuring tape"
          width={1536}
          height={1024}
          loading="lazy"
          className="aspect-[3/2] w-full rounded-xl object-cover shadow-card"
        />
        <div className="space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          <p>{site.intro}</p>
          <p>
            Bridal aur heavy-work blouses par scalloped pearl borders, handmade dori latkans aur
            clean princess-cut fitting se lekar everyday Alia-cut suits, flared twirl lehengas aur
            kids frocks with matching scrunchies tak — har detail haath se finish ki jaati hai.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link to="/gallery" className="btn-primary">
              Gallery dekhein
            </Link>
            <a href={site.instagramUrl} target="_blank" rel="noreferrer" className="btn-outline">
              <Instagram className="h-4 w-4" />@{site.instagramHandle}
            </a>
            <a
              href={whatsappLink(
                "Namaste Mohini Creation, mujhe custom stitching ke baare mein baat karni hai.",
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
