import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Film, Instagram, X } from "lucide-react";
import { instagramEmbedUrl, site, type GalleryItem } from "@/content/site";

export function HeroAutoplayVideo({ src, poster }: { src: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const inViewRef = useRef(true);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    // Enforce muted & playsInline attributes on the DOM node for iOS Safari / Android Chrome autoplay.
    el.muted = true;
    el.defaultMuted = true;
    el.setAttribute("muted", "");
    el.setAttribute("playsinline", "");

    const tryPlay = () => {
      el.muted = true;
      void el.play().catch(() => {});
    };

    if (typeof IntersectionObserver === "undefined") {
      tryPlay();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          inViewRef.current = entry.isIntersecting;
          if (entry.isIntersecting) {
            tryPlay();
          } else {
            el.pause();
          }
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [src]);

  return (
    <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-muted shadow-card">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        disablePictureInPicture
        controlsList="nodownload"
        onCanPlay={() => {
          const el = videoRef.current;
          if (el && inViewRef.current) {
            el.muted = true;
            void el.play().catch(() => {});
          }
        }}
        aria-label={`${site.name} showcase video`}
        className="pointer-events-none h-full w-full object-cover"
      />
    </div>
  );
}

export function GalleryCard({
  item,
  onSelect,
  priority = false,
}: {
  item: GalleryItem;
  onSelect: () => void;
  priority?: boolean;
}) {
  const isReel = item.source === "reel" || item.type === "video";
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group flex flex-col text-left focus-visible:outline-none"
      aria-label={`${item.title} bada dekhein`}
    >
      <div className="relative w-full overflow-hidden rounded-xl bg-muted shadow-card">
        <img
          src={item.poster ?? item.src}
          alt={item.title}
          width={item.width}
          height={item.height}
          loading={priority ? "eager" : "lazy"}
          className="aspect-[3/4] w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        {isReel && (
          <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 rounded-full bg-foreground/80 px-2.5 py-1 text-[11px] font-medium tracking-wide text-background backdrop-blur-xs">
            <Film className="h-3 w-3" aria-hidden="true" />
            Reel
          </span>
        )}
      </div>
      <p className="mt-2.5 font-display text-lg leading-snug text-foreground group-hover:text-primary transition-colors">
        {item.title}
      </p>
      <p className="mt-0.5 text-xs text-muted-foreground">
        {item.category}
        {item.highlights?.[0] ? ` · ${item.highlights[0]}` : ""}
      </p>
    </button>
  );
}

export function GalleryLightbox({
  items,
  index,
  onChangeIndex,
  onClose,
}: {
  items: GalleryItem[];
  index: number | null;
  onChangeIndex: (next: number) => void;
  onClose: () => void;
}) {
  const cur = index === null ? null : items[index];

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChangeIndex((index + 1) % items.length);
      if (e.key === "ArrowLeft") onChangeIndex((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, items.length, onChangeIndex, onClose]);

  if (!cur || index === null) return null;

  const embedUrl = cur.type === "video" ? instagramEmbedUrl(cur.src) : null;
  const igTarget =
    cur.instagramUrl ?? (cur.source === "reel" ? site.instagramReelsUrl : site.instagramUrl);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={cur.title}
      className="fixed inset-0 z-50 flex flex-col bg-foreground/95 text-background"
    >
      <div className="flex items-center justify-between gap-4 border-b border-background/10 px-4 py-3">
        <div className="min-w-0">
          <p className="truncate font-display text-xl md:text-2xl">{cur.title}</p>
          <p className="text-xs text-background/70">
            {cur.category}
            {cur.source === "reel" ? " · Instagram Reel showcase" : ""}
            <span className="ml-2 tabular-nums">
              ({index + 1} / {items.length})
            </span>
          </p>
        </div>
        <button
          type="button"
          autoFocus
          onClick={onClose}
          aria-label="Band karein"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full hover:bg-background/10"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-12 py-4">
        {cur.type === "video" ? (
          embedUrl ? (
            <iframe
              src={embedUrl}
              title={cur.title}
              className="aspect-[9/16] h-full max-h-[70vh] w-auto max-w-full rounded-xl bg-background"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <video
              src={cur.src}
              poster={cur.poster}
              controls
              playsInline
              className="max-h-full max-w-full rounded-xl"
            >
              Video load nahi ho paaya.
            </video>
          )
        ) : (
          <img
            src={cur.src}
            alt={cur.title}
            className="max-h-full max-w-full rounded-xl object-contain"
          />
        )}
        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => onChangeIndex((index - 1 + items.length) % items.length)}
              aria-label="Pichhla"
              className="absolute left-2 grid h-11 w-11 place-items-center rounded-full bg-background/15 text-background transition-colors hover:bg-background/25 md:left-4"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => onChangeIndex((index + 1) % items.length)}
              aria-label="Agla"
              className="absolute right-2 grid h-11 w-11 place-items-center rounded-full bg-background/15 text-background transition-colors hover:bg-background/25 md:right-4"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-3 border-t border-background/10 px-4 py-4 text-center">
        <p className="text-sm text-background/85">{cur.description}</p>
        {cur.highlights && cur.highlights.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1.5">
            {cur.highlights.map((h) => (
              <span
                key={h}
                className="rounded-full border border-background/20 bg-background/10 px-3 py-0.5 text-xs text-background/90"
              >
                {h}
              </span>
            ))}
          </div>
        )}
        <div className="mt-1 flex flex-wrap justify-center gap-3">
          <Link
            to="/enquiry"
            search={{ design: cur.title }}
            onClick={onClose}
            className="btn-primary"
          >
            Is design ke baare mein poochhein
          </Link>
          <a
            href={igTarget}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-background/40 px-5 text-sm font-medium text-background transition-colors hover:bg-background/10"
          >
            <Instagram className="h-4 w-4" />
            {cur.instagramUrl ? "Instagram post dekhein" : `@${site.instagramHandle} par dekhein`}
            <ExternalLink className="h-3.5 w-3.5 opacity-75" />
          </a>
        </div>
      </div>
    </div>
  );
}
