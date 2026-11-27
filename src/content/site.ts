// All editable business content lives here. Change once, updates everywhere.
import type { VideoCarouselItem } from "@/components/site/VideoCarousel3D";

const lookbook = {
  hero: "/lookbook/hero.jpg",
  suit: "/lookbook/suit.jpg",
  blouse: "/lookbook/blouse.jpg",
  lehenga: "/lookbook/lehenga.jpg",
  bridal: "/lookbook/bridal.jpg",
  studio: "/lookbook/studio.jpg",
};

export const site = {
  name: "Mohini Creation",
  signature: "Creation By Mohini",
  tagline: "Custom designer stitching",
  intro:
    "Every outfit is custom designed and stitched to match your measurements, occasion, and personal style.",
  whatsappNumber: "917878096752", // digits only, with country code
  instagramHandle: "mohini_creation15",
  instagramUrl: "https://www.instagram.com/mohini_creation15/",
  instagramReelsUrl: "https://www.instagram.com/mohini_creation15/reels/",
  // Leave empty ("") until the owner provides them — empty values are hidden on the site.
  phoneDisplay: "+91 78780 96752",
  email: "",
  serviceArea: "",
  workingHours: "",
  images: {
    hero: lookbook.hero,
    studio: lookbook.studio,
    instagramStudio: "/instagram/studio-measuring-reel.jpg",
    heroVideoPoster: "/videos/mohini-video-poster.jpg",
  },
  // Place your MP4 at public/videos/mohini-video.mp4 (served at /videos/mohini-video.mp4).
  heroVideo: "/videos/mohini-video.mp4",
  // Set either a local video path ("/videos/reel.mp4") or an Instagram Reel URL ("https://www.instagram.com/reel/.../").
  measurementVideo: "",
  featuredReel: "",
};

export const videos: VideoCarouselItem[] = [
  { id: "video-1", src: "/videos/video-1.mp4" },
  { id: "video-2", src: "/videos/video-2.mp4" },
  { id: "video-3", src: "/videos/video-3.mp4" },
];

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

/**
 * Converts a public Instagram Post or Reel URL into its official iframe embed URL.
 * Returns null for non-Instagram or profile-only URLs so callers fall back cleanly.
 */
export function instagramEmbedUrl(url: string): string | null {
  const match = url.match(/instagram\.com\/(?:[^/]+\/)?(reel|p|tv)\/([A-Za-z0-9_-]+)/i);
  const kind = match?.[1];
  const code = match?.[2];
  if (!kind || !code) return null;
  return `https://www.instagram.com/${kind.toLowerCase()}/${code}/embed/`;
}

export const categories = ["Suits & Kurtis", "Blouses", "Lehengas", "Bridal", "Kids Wear"] as const;
export type Category = (typeof categories)[number];

export type GalleryItem = {
  id: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  title: string;
  category: Category;
  description: string;
  highlights?: string[];
  source?: "studio" | "reel" | "post";
  instagramUrl?: string;
  featured?: boolean;
  width: number;
  height: number;
};

// Combines Mohini Creation's studio signature lookbook photos and real @mohini_creation15 Instagram showcase items.
// To play a Reel or MP4 inline inside the site, set `type` to "video" and `src` to "/videos/<file>.mp4" or an Instagram Reel URL.
export const gallery: GalleryItem[] = [
  // Original signature lookbook photos (kept for hero/dashboard & lookbook)
  {
    id: "rose-anarkali",
    type: "image",
    source: "studio",
    src: lookbook.hero,
    title: "Rose Anarkali",
    category: "Suits & Kurtis",
    description:
      "Floor-length rose anarkali with zari embroidery, tailored measurements, and a flowing silhouette.",
    highlights: ["Zari embroidery", "Floor-length flare"],
    featured: true,
    width: 1024,
    height: 1536,
  },
  {
    id: "mint-suit",
    type: "image",
    source: "studio",
    src: lookbook.suit,
    title: "Mint Cotton Suit",
    category: "Suits & Kurtis",
    description: "Daily-wear cotton suit featuring delicate thread work and clean tailoring.",
    highlights: ["Breathable cotton", "Fine thread work"],
    featured: true,
    width: 1024,
    height: 1536,
  },
  {
    id: "maroon-blouse",
    type: "image",
    source: "studio",
    src: lookbook.blouse,
    title: "Maroon Zari Blouse",
    category: "Blouses",
    description: "Tailored silk designer blouse with intricate zari detailing along the back.",
    highlights: ["Silk zari back", "Tailored fit"],
    featured: true,
    width: 1024,
    height: 1536,
  },
  {
    id: "terracotta-lehenga",
    type: "image",
    source: "studio",
    src: lookbook.lehenga,
    title: "Terracotta Lehenga",
    category: "Lehengas",
    description:
      "Custom-stitched festive lehenga crafted with generous flare and a structured drape.",
    highlights: ["Flowing gher", "Festive drape"],
    featured: true,
    width: 1024,
    height: 1536,
  },
  {
    id: "red-bridal",
    type: "image",
    source: "studio",
    src: lookbook.bridal,
    title: "Red Bridal Lehenga",
    category: "Bridal",
    description:
      "Signature bridal lehenga finished with rich gold embroidery and classic bridal detailing.",
    highlights: ["Heavy gold embroidery", "Bridal custom fit"],
    width: 1024,
    height: 1536,
  },

  // Real @mohini_creation15 Instagram showcase pieces (Reels & Posts)
  {
    id: "white-gold-lehenga",
    type: "image",
    source: "reel",
    src: "/instagram/white-gold-lehenga-reel.jpg",
    title: "Ivory & Gold Pearl Bridal Lehenga",
    category: "Bridal",
    description:
      "Ivory and gold floral embroidered lehenga finished with handmade pearl latkan tassels and fine gota-kinari edging.",
    highlights: ["Pearl latkan tassels", "Gold floral embroidery", "Custom bridal fit"],
    width: 250,
    height: 335,
  },
  {
    id: "blue-twirl-lehenga",
    type: "image",
    source: "reel",
    src: "/instagram/blue-twirl-lehenga-reel.jpg",
    title: "Powder Blue Floral Twirl Lehenga",
    category: "Lehengas",
    description:
      "Flowing floral-embroidered flared lehenga paired with a back tie-up dori choli and full twirl flare.",
    highlights: ["Full flare skirt", "Back dori blouse", "Festive twirl look"],
    width: 244,
    height: 328,
  },
  {
    id: "maroon-zari-blouse",
    type: "image",
    source: "reel",
    src: "/instagram/maroon-zari-blouse-reel.jpg",
    title: "Maroon Pearl-Cutwork Bridal Blouse",
    category: "Bridal",
    description:
      "Deep maroon bridal blouse featuring scalloped pearl edging along the back neckline, heavy zardosi motifs, and beaded dori latkans.",
    highlights: ["Scallop pearl border", "Heavy zardosi back", "Handmade dori latkans"],
    width: 249,
    height: 335,
  },
  {
    id: "pink-festive-lehenga",
    type: "image",
    source: "post",
    src: "/instagram/pink-festive-lehenga.jpg",
    title: "Rani Pink Net Lehenga & Gold Dupatta",
    category: "Lehengas",
    description:
      "Vibrant rani-pink flared lehenga with gold gota border, embroidered choli, and an ivory scalloped net dupatta.",
    highlights: ["Gold border flare", "Embroidered choli", "Contrast net dupatta"],
    width: 200,
    height: 294,
  },
  {
    id: "pink-alia-anarkali",
    type: "image",
    source: "post",
    src: "/instagram/pink-alia-anarkali.jpg",
    instagramUrl: "https://www.instagram.com/mohini_creation15/p/DUOGOXzk2_1/",
    title: "Blush Pink Floral Alia-Cut Anarkali",
    category: "Suits & Kurtis",
    description:
      "Signature Alia-cut gathered floral cotton anarkali with a breezy day-wear silhouette and tailored sleeves.",
    highlights: ["Alia-cut neckline", "Soft floral print", "Full-length flare"],
    width: 166,
    height: 286,
  },
  {
    id: "pink-mirror-sharara",
    type: "image",
    source: "reel",
    src: "/instagram/pink-mirror-sharara-reel.jpg",
    title: "Rose Pink Mirror-Work Kurta & Palazzo",
    category: "Suits & Kurtis",
    description:
      "Rani-pink kurta and wide white palazzo set finished with genuine mirror-work border detailing along the hem and neckline.",
    highlights: ["Real mirror-work border", "Wide white palazzo", "Festive suit set"],
    width: 244,
    height: 328,
  },
  {
    id: "plum-zardosi-blouse",
    type: "image",
    source: "post",
    src: "/instagram/plum-zardosi-blouse.jpg",
    title: "Plum Zardosi V-Back Designer Blouse",
    category: "Blouses",
    description:
      "Rich plum blouse covered in sequin and zardosi embroidery with a tailored V-back and matching embroidered tassels.",
    highlights: ["All-over zardosi & sequin", "V-back dori tie", "Custom padded option"],
    width: 245,
    height: 335,
  },
  {
    id: "purple-kids-coord",
    type: "image",
    source: "post",
    src: "/instagram/purple-kids-coord.jpg",
    title: "Purple Gota-Border Kids Co-ord & Scrunchie",
    category: "Kids Wear",
    description:
      "Kids sleeveless kurti and wide-leg palazzo set trimmed with silver gota lace, side tie-ups, and a matching scrunchie.",
    highlights: ["Silver gota border", "Comfort kids fit", "Matching scrunchie"],
    width: 224,
    height: 158,
  },
  {
    id: "lavender-shimmer-blouse",
    type: "image",
    source: "reel",
    src: "/instagram/lavender-shimmer-blouse-reel.jpg",
    title: "Lavender Shimmer Sweetheart Blouse",
    category: "Blouses",
    description:
      "Lilac shimmer silk blouse tailored with a sweetheart back neckline, beaded piping, and floral resham-sequin sleeves.",
    highlights: ["Sweetheart back", "Embroidered sleeves", "Shimmer tissue fabric"],
    width: 249,
    height: 308,
  },
  {
    id: "teal-mirror-blouse",
    type: "image",
    source: "reel",
    src: "/instagram/teal-mirror-blouse-reel.jpg",
    title: "Teal Mirror & Zari Designer Blouse",
    category: "Blouses",
    description:
      "Peacock-teal zari and mirror-work blouse crafted with a scalloped back neckline, floral sleeves, and matching dori tassels.",
    highlights: ["Scallop mirror neckline", "Teal zari weave", "Matched lehenga set"],
    width: 250,
    height: 290,
  },
  {
    id: "rani-shimmer-blouse",
    type: "image",
    source: "post",
    src: "/instagram/rani-shimmer-blouse.jpg",
    title: "Rani Pink Shimmer Tissue Blouse",
    category: "Blouses",
    description:
      "Classic Creation By Mohini tailored blouse on rose-gold shimmer tissue with delicate beaded lace edging.",
    highlights: ["Beaded edge lace", "Precision princess cut", "Tissue shimmer"],
    width: 249,
    height: 289,
  },
  {
    id: "mauve-floral-lehenga",
    type: "image",
    source: "reel",
    src: "/instagram/mauve-floral-lehenga-reel.jpg",
    title: "Mauve Multi-Floral Embroidered Lehenga",
    category: "Lehengas",
    description:
      "Warm mauve festive lehenga-choli set detailed with multi-color floral resham and zari embroidery.",
    highlights: ["Multi-floral embroidery", "Matched stitched choli", "Sangeet & mehendi pick"],
    width: 249,
    height: 335,
  },
  {
    id: "green-pattu-lehenga",
    type: "image",
    source: "post",
    src: "/instagram/green-pattu-lehenga.jpg",
    title: "Forest Green Silk Zari Lehenga",
    category: "Lehengas",
    description:
      "Traditional forest-green brocade pattu lehenga-choli featuring a woven golden zari border and puff-sleeve blouse.",
    highlights: ["Traditional gold zari", "Puff-sleeve blouse", "Festive silk silhouette"],
    width: 190,
    height: 256,
  },
  {
    id: "black-blockprint-suit",
    type: "image",
    source: "post",
    src: "/instagram/black-blockprint-suit.jpg",
    instagramUrl: "https://www.instagram.com/mohini_creation15/p/DK1Laf0tgby/",
    title: "Black & White Block-Print Kurta Set",
    category: "Suits & Kurtis",
    description:
      "Handblock-inspired black cotton straight kurta and chevron-print trouser set with crisp white crochet lace on the sleeves and V-neck.",
    highlights: ["Breathable cotton", "White crochet lace trim", "Coordinated pant set"],
    width: 192,
    height: 250,
  },
  {
    id: "monochrome-kurta-collage",
    type: "image",
    source: "post",
    src: "/instagram/monochrome-kurta-collage.jpg",
    title: "Monochrome Geometric Bell-Sleeve Set",
    category: "Suits & Kurtis",
    description:
      "All-over geometric print tailored kurta-pant co-ord accented with contrast black piping and flared bell sleeves.",
    highlights: ["Contrast piping neckline", "Flared bell sleeves", "Custom daily-wear fit"],
    width: 229,
    height: 294,
  },
  {
    id: "navy-daisy-frock",
    type: "image",
    source: "post",
    src: "/instagram/navy-daisy-frock.jpg",
    title: "Navy Daisy Bow Frock & Scrunchie",
    category: "Kids Wear",
    description:
      "Navy daisy-print strap frock tailored with a front pleated bow, white piping trim, and a matching hair scrunchie.",
    highlights: ["Front tailored bow", "White piping edge", "Matching hair scrunchie"],
    width: 220,
    height: 240,
  },
  {
    id: "navy-polka-frock",
    type: "image",
    source: "post",
    src: "/instagram/navy-polka-frock.jpg",
    title: "Navy Foil-Dot Flared Party Frock",
    category: "Kids Wear",
    description:
      "Sparkling navy foil-dot gathered party frock finished with contrast neckline piping and an adjustable back waist bow.",
    highlights: ["Soft gathered flare", "Contrast neckline piping", "Back waist tie-bow"],
    width: 184,
    height: 256,
  },
];

export type Service = {
  name: string;
  description: string;
  image?: string;
  category?: Category;
};

export const services: Service[] = [
  {
    name: "Custom Stitching",
    description:
      "Complete outfits tailored from your own design idea or inspiration reference to your exact measurements.",
    image: lookbook.hero,
  },
  {
    name: "Blouse Stitching",
    description:
      "Custom saree and lehenga blouses featuring sweetheart backs, scalloped pearl cutwork, dori latkans, and zardosi detailing.",
    image: lookbook.blouse,
    category: "Blouses",
  },
  {
    name: "Suit Stitching",
    description:
      "Alia-cut anarkalis, mirror-work palazzo sets, and breathable cotton daily-wear suits from your fabric.",
    image: lookbook.suit,
    category: "Suits & Kurtis",
  },
  {
    name: "Lehenga Design",
    description:
      "Full-flare festive and bridal lehenga design and stitching customized for your celebration.",
    image: lookbook.lehenga,
    category: "Lehengas",
  },
  {
    name: "Kids Ethnic & Frocks",
    description:
      "Girls party frocks, festive co-ord sets, and matching scrunchies sewn with soft, comfortable finishing.",
    image: "/instagram/purple-kids-coord.jpg",
    category: "Kids Wear",
  },
  {
    name: "Alterations",
    description:
      "Precision fitting adjustments, sleeve alterations, and finishing refinements for existing outfits.",
    image: "/instagram/studio-measuring-reel.jpg",
  },
];

// Measurements the designer requests — edit freely.
export const measurements = [
  "Bust / Chest",
  "Waist",
  "Hip",
  "Shoulder",
  "Arm hole",
  "Sleeve length",
  "Sleeve round",
  "Front neck depth",
  "Back neck depth",
  "Top / Kurta length",
  "Bottom length",
];

export const orderSteps = [
  {
    title: "Choose a design",
    text: "Pick your favorite look from our lookbook or Instagram showcase.",
  },
  {
    title: "Send an enquiry",
    text: "Fill out the enquiry form or message us directly on WhatsApp with your screenshot.",
  },
  {
    title: "Share measurements",
    text: "Send your measurements using our guide or ask for a fitting appointment.",
  },
  {
    title: "Confirm details",
    text: "The designer will confirm fabric, delivery timeline, and final styling details with you.",
  },
];
