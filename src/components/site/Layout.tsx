import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, MessageCircle, Instagram, ExternalLink, Film } from "lucide-react";
import { instagramEmbedUrl, site, whatsappLink } from "@/content/site";

const nav = [
  { to: "/", label: "Home" },
  { to: "/gallery", label: "Gallery" },
  { to: "/services", label: "Services" },
  { to: "/measurements", label: "Measurement Guide" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-baseline gap-2 text-foreground">
          <span className="font-display text-2xl font-semibold tracking-tight">{site.name}</span>
          <span className="hidden text-xs text-muted-foreground sm:inline">
            @{site.instagramHandle}
          </span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-sm font-medium text-primary" }}
              activeOptions={{ exact: true }}
            >
              {n.label}
            </Link>
          ))}
          <Link to="/enquiry" search={{}} className="btn-primary h-10 px-5 text-sm">
            Enquire
          </Link>
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <Link to="/enquiry" search={{}} className="btn-primary h-10 px-4 text-sm">
            Enquire
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="grid h-11 w-11 place-items-center rounded-md text-foreground"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          className="border-t border-border bg-background px-4 pb-4 lg:hidden"
          aria-label="Mobile"
        >
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="block border-b border-border py-3 text-base text-foreground"
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/enquiry"
            search={{}}
            onClick={() => setOpen(false)}
            className="block py-3 text-base text-primary"
          >
            Order Enquiry
          </Link>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 pb-24 md:grid-cols-[1.2fr_1fr] md:pb-12">
        <div>
          <p className="font-display text-3xl font-semibold">{site.name}</p>
          <p className="mt-1 font-display text-lg italic text-primary">{site.signature}</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            {site.intro}
          </p>
        </div>
        <div className="flex flex-col justify-between gap-6 md:items-end">
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <Link to="/gallery" className="hover:text-foreground">
              Gallery
            </Link>
            <Link to="/services" className="hover:text-foreground">
              Services
            </Link>
            <Link to="/measurements" className="hover:text-foreground">
              Measurement Guide
            </Link>
            <Link to="/enquiry" search={{}} className="hover:text-foreground">
              Order Enquiry
            </Link>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn-outline">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <a href={site.instagramUrl} target="_blank" rel="noreferrer" className="btn-outline">
              <Instagram className="h-4 w-4" />@{site.instagramHandle}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink("Hello Mohini Creation, I would like to enquire about a custom outfit.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Message on WhatsApp"
      className="fixed right-4 bottom-4 z-30 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-elegant transition-transform hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}

export function PageHeader({ title, text }: { eyebrow?: string; title: string; text?: string }) {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 pb-8 md:pt-14">
      <h1 className="font-display text-4xl leading-tight font-semibold md:text-6xl">{title}</h1>
      {text && (
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {text}
        </p>
      )}
    </div>
  );
}

export function VideoSlot({
  src,
  label,
  poster,
  instagramUrl,
  vertical,
}: {
  src: string;
  label: string;
  poster?: string;
  instagramUrl?: string;
  vertical?: boolean;
}) {
  const cls = `w-full overflow-hidden rounded-xl bg-muted ${vertical ? "aspect-[4/5] max-w-sm" : "aspect-video"}`;
  const embed = src ? instagramEmbedUrl(src) : null;
  const igHref = instagramUrl ?? site.instagramReelsUrl;

  if (embed) {
    return (
      <div className={`${cls} shadow-card`}>
        <iframe
          src={embed}
          title={label}
          className="h-full w-full border-0"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  if (src) {
    return (
      <video
        className={`${cls} object-cover shadow-card`}
        src={src}
        poster={poster}
        controls
        muted
        playsInline
        preload="metadata"
      >
        Unable to load video. <a href={igHref}>Watch on Instagram</a>.
      </video>
    );
  }

  return (
    <div className={`${cls} relative border border-border shadow-card`}>
      {poster ? (
        <img src={poster} alt={label} className="h-full w-full object-cover" loading="lazy" />
      ) : null}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-foreground/85 via-foreground/25 to-transparent p-5 text-background">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-background/15 px-3 py-1 text-xs font-medium backdrop-blur-xs">
          <Film className="h-3.5 w-3.5" aria-hidden="true" />
          {site.signature}
        </span>
        <p className="mt-2 font-display text-2xl leading-tight">{label}</p>
        <p className="mt-1 text-xs text-background/80">
          Watch our latest stitching reels and measurement clips on @{site.instagramHandle}.
        </p>
        <a
          href={igHref}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-background px-4 py-2 text-xs font-medium text-foreground transition-opacity hover:opacity-90"
        >
          <Instagram className="h-3.5 w-3.5" />
          Watch Instagram Reels
          <ExternalLink className="h-3 w-3 opacity-70" />
        </a>
      </div>
    </div>
  );
}
