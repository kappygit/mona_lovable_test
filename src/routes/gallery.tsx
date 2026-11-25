import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Instagram } from "lucide-react";
import { categories, gallery, site } from "@/content/site";
import { PageHeader } from "@/components/site/Layout";
import { GalleryCard, GalleryLightbox } from "@/components/site/Showcase";

type GallerySearch = { category?: string };

export const Route = createFileRoute("/gallery")({
  validateSearch: (s: Record<string, unknown>): GallerySearch => ({
    ...(typeof s["category"] === "string" ? { category: s["category"] } : {}),
  }),
  head: () => ({
    meta: [
      { title: "Design Gallery — Mohini Creation" },
      {
        name: "description",
        content:
          "Real bridal blouses, festive lehengas, Alia-cut suits, and kids outfits from Mohini Creation (@mohini_creation15).",
      },
      { property: "og:title", content: "Design Gallery — Mohini Creation" },
      {
        property: "og:description",
        content:
          "Custom stitched outfits and Instagram Reels showcase from Mohini Creation (@mohini_creation15).",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const search = Route.useSearch();
  const initialCat =
    search.category && (categories as readonly string[]).includes(search.category)
      ? search.category
      : "All";
  const [cat, setCat] = useState<string>(initialCat);
  const [mediaFilter, setMediaFilter] = useState<"all" | "reel" | "post" | "studio">("all");
  const [idx, setIdx] = useState<number | null>(null);

  useEffect(() => {
    setCat(initialCat);
    setIdx(null);
  }, [initialCat]);

  const chips = ["All", ...categories.filter((c) => gallery.some((g) => g.category === c))];
  const items = useMemo(
    () =>
      gallery.filter((g) => {
        if (cat !== "All" && g.category !== cat) return false;
        if (mediaFilter !== "all" && g.source !== mediaFilter) return false;
        return true;
      }),
    [cat, mediaFilter],
  );

  return (
    <>
      <PageHeader
        title="Design Gallery"
        text={`Signature lookbook pieces and real bridal blouses, festive lehengas, Alia-cut suits, and kids sets featured on @${site.instagramHandle}.`}
      />
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div
            className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0"
            role="tablist"
            aria-label="Categories"
          >
            {chips.map((c) => {
              const count =
                c === "All" ? gallery.length : gallery.filter((g) => g.category === c).length;
              const selected = cat === c;
              return (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => {
                    setCat(c);
                    setIdx(null);
                  }}
                  className={`inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border px-4 text-sm transition-colors ${
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card hover:bg-secondary"
                  }`}
                >
                  <span>{c}</span>
                  <span
                    className={`text-xs tabular-nums ${selected ? "opacity-85" : "text-muted-foreground"}`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                { id: "all", label: "All" },
                { id: "reel", label: "IG Reels" },
                { id: "post", label: "IG Posts" },
                { id: "studio", label: "Lookbook" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setMediaFilter(opt.id);
                  setIdx(null);
                }}
                className={`h-9 rounded-full px-3.5 text-xs font-medium transition-colors ${
                  mediaFilter === opt.id
                    ? "bg-foreground text-background"
                    : "border border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {items.map((g, i) => (
            <GalleryCard key={g.id} item={g} onSelect={() => setIdx(i)} priority={i < 4} />
          ))}
        </div>

        {items.length === 0 && (
          <div className="mt-10 rounded-xl border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
            No designs match this filter yet —{" "}
            <button
              type="button"
              onClick={() => {
                setCat("All");
                setMediaFilter("all");
              }}
              className="font-medium text-primary underline"
            >
              View all designs
            </button>
            .
          </div>
        )}

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-secondary p-6">
          <div>
            <p className="font-display text-2xl font-semibold">
              New designs and Reels are added regularly
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Follow @{site.instagramHandle} on Instagram or send any outfit screenshot directly on
              WhatsApp.
            </p>
          </div>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-outline bg-background"
          >
            <Instagram className="h-4 w-4" />
            View @{site.instagramHandle}
          </a>
        </div>
      </div>

      <GalleryLightbox
        items={items}
        index={idx}
        onChangeIndex={(next) => setIdx(next)}
        onClose={() => setIdx(null)}
      />
    </>
  );
}
