import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, ExternalLink, Instagram, MessageCircle } from "lucide-react";
import {
  categories,
  gallery,
  orderSteps,
  services,
  site,
  videos,
  whatsappLink,
} from "@/content/site";
import { VideoSlot } from "@/components/site/Layout";
import { GalleryCard, GalleryLightbox, HeroAutoplayVideo } from "@/components/site/Showcase";
import { VideoCarousel3D } from "@/components/site/VideoCarousel3D";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mohini Creation — Creation By Mohini | Custom Designer Stitching" },
      {
        name: "description",
        content:
          "Custom suits, bridal blouses, lehengas, Alia-cut outfits, and kids wear. Explore designs and enquire on WhatsApp.",
      },
      { property: "og:title", content: "Mohini Creation — Designer outfits tailored to your fit" },
      {
        property: "og:description",
        content:
          "Custom suits, blouses, lehengas, and bridal outfits. Explore designs and enquire on WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const [igTab, setIgTab] = useState<"all" | "reel" | "post">("all");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightboxItems, setLightboxItems] = useState(gallery);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const featuredDashboard = useMemo(() => gallery.filter((g) => g.featured).slice(0, 4), []);
  const instagramItems = useMemo(
    () => gallery.filter((g) => g.source === "reel" || g.source === "post"),
    [],
  );
  const visibleInstagram = useMemo(
    () => (igTab === "all" ? instagramItems : instagramItems.filter((g) => g.source === igTab)),
    [igTab, instagramItems],
  );
  const categoryItems = useMemo(() => {
    if (activeCategory === "All") return gallery.slice(0, 8);
    return gallery.filter((g) => g.category === activeCategory).slice(0, 8);
  }, [activeCategory]);

  const openLightbox = (pool: typeof gallery, index: number) => {
    setLightboxItems(pool);
    setLightboxIdx(index);
  };

  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-8 px-4 pt-6 md:grid-cols-2 md:items-start md:pt-12">
        <div className="order-2 min-w-0 md:sticky md:top-24 md:order-1 md:py-10">
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <Instagram className="h-3.5 w-3.5 text-primary" />
            <span>{site.signature}</span>
            <span className="text-muted-foreground">· @{site.instagramHandle}</span>
          </a>
          <h1 className="mt-4 max-w-lg font-display text-5xl leading-[1.03] font-semibold md:text-7xl">
            Styled for you, tailored to fit.
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            {site.intro}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link to="/gallery" className="btn-primary">
              View Designs
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={whatsappLink("Hello, I would like to enquire about a custom outfit.")}
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              <MessageCircle className="h-4 w-4" />
              Ask on WhatsApp
            </a>
          </div>
          <dl className="mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-5 text-sm">
            <div>
              <dt className="text-muted-foreground">Total designs</dt>
              <dd className="mt-0.5 font-display text-2xl font-semibold tabular-nums">
                {gallery.length}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Instagram showcase</dt>
              <dd className="mt-0.5 font-display text-2xl font-semibold tabular-nums">
                {instagramItems.length}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Categories</dt>
              <dd className="mt-0.5 font-display text-2xl font-semibold tabular-nums">
                {categories.length}
              </dd>
            </div>
          </dl>
        </div>
        <div className="order-1 flex min-w-0 flex-col gap-8 md:order-2">
          <img
            src={site.images.hero}
            alt="Rose anarkali suit — signature design"
            width={1024}
            height={1536}
            className="aspect-[4/5] w-full rounded-xl object-cover object-top shadow-card md:aspect-[3/4]"
          />
          <HeroAutoplayVideo src={site.heroVideo} poster={site.images.heroVideoPoster} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-20">
        <div className="mb-6 text-center">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">Video highlights</h2>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Add a short introduction to your videos here.
          </p>
        </div>
        <VideoCarousel3D videos={videos} />
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-semibold md:text-4xl">Featured lookbook</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Signature studio pieces — tap any outfit to inspect closely.
            </p>
          </div>
          <Link
            to="/gallery"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {featuredDashboard.map((g, idx) => (
            <GalleryCard
              key={g.id}
              item={g}
              onSelect={() => openLightbox(featuredDashboard, idx)}
              priority
            />
          ))}
        </div>
      </section>

      <section className="mt-20 bg-secondary py-14 md:py-18">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-semibold md:text-5xl">
                Instagram Showcase · @{site.instagramHandle}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground md:text-base">
                Real Instagram Reels and custom stitched outfits by {site.signature} — bridal
                blouses, twirl lehengas, Alia-cut suits, and kids sets.
              </p>
            </div>
            <a
              href={site.instagramReelsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-outline bg-background"
            >
              <Instagram className="h-4 w-4" />
              View on Instagram
              <ExternalLink className="h-3.5 w-3.5 opacity-70" />
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {(
              [
                { id: "all", label: `All Creations (${instagramItems.length})` },
                {
                  id: "reel",
                  label: `Reels (${instagramItems.filter((i) => i.source === "reel").length})`,
                },
                {
                  id: "post",
                  label: `Outfit Posts (${instagramItems.filter((i) => i.source === "post").length})`,
                },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setIgTab(t.id)}
                className={`h-9 rounded-full border px-4 text-xs font-medium tabular-nums transition-colors ${
                  igTab === t.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground hover:bg-card"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {visibleInstagram.map((item, idx) => (
              <GalleryCard
                key={item.id}
                item={item}
                onSelect={() => openLightbox(visibleInstagram, idx)}
                priority={idx < 4}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-semibold md:text-4xl">Browse by category</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Explore both studio lookbook and Instagram creations together.
            </p>
          </div>
          <Link
            to="/gallery"
            search={activeCategory === "All" ? {} : { category: activeCategory }}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Full gallery ({gallery.length})
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div
          className="no-scrollbar -mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0"
          role="tablist"
        >
          {["All", ...categories].map((cat) => {
            const count =
              cat === "All" ? gallery.length : gallery.filter((g) => g.category === cat).length;
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveCategory(cat)}
                className={`inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border px-4 text-sm transition-colors ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:bg-secondary"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-xs tabular-nums ${active ? "opacity-85" : "text-muted-foreground"}`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {categoryItems.map((item, idx) => (
            <GalleryCard
              key={item.id}
              item={item}
              onSelect={() => openLightbox(categoryItems, idx)}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">Services</h2>
          <Link
            to="/services"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            All services
          </Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.name}
              className="overflow-hidden rounded-xl border border-border bg-card"
            >
              {s.image && (
                <img
                  src={s.image}
                  alt={s.name}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover object-top"
                />
              )}
              <div className="p-5">
                <h3 className="font-display text-2xl font-semibold">{s.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    to="/enquiry"
                    search={{ service: s.name }}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Enquire now
                  </Link>
                  {s.category && (
                    <Link
                      to="/gallery"
                      search={{ category: s.category }}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      View {s.category}
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 pt-20 md:grid-cols-[auto_1fr] md:items-center">
        <VideoSlot
          src={site.featuredReel}
          poster={site.images.instagramStudio}
          instagramUrl={site.instagramReelsUrl}
          label="Creation By Mohini Studio"
          vertical
        />
        <div>
          <h2 className="font-display text-3xl font-semibold md:text-4xl">How to order</h2>
          <ol className="mt-6 space-y-5">
            {orderSteps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="font-display text-3xl font-semibold text-gold tabular-nums">
                  0{i + 1}
                </span>
                <div>
                  <p className="font-medium text-foreground">{s.title}</p>
                  <p className="text-sm text-muted-foreground">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/enquiry" search={{}} className="btn-primary">
              Send Order Enquiry
            </Link>
            <a href={site.instagramUrl} target="_blank" rel="noreferrer" className="btn-outline">
              <Instagram className="h-4 w-4" />
              Follow on Instagram
            </a>
          </div>
        </div>
      </section>

      <GalleryLightbox
        items={lightboxItems}
        index={lightboxIdx}
        onChangeIndex={(next) => setLightboxIdx(next)}
        onClose={() => setLightboxIdx(null)}
      />
    </>
  );
}
