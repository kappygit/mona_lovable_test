// All editable business content lives here. Change once, updates everywhere.
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
    "Har outfit aapke naap, aapke occasion aur aapki pasand ke hisaab se design aur stitch kiya jaata hai.",
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
      "Zari embroidery ke saath floor-length rose anarkali — custom naap aur flowy silhouette.",
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
    description: "Halki thread work aur neat finishing wala daily-wear cotton suit.",
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
    description: "Back par zari design aur precision tailoring wala silk designer blouse.",
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
    description: "Flowing gher aur rich festive fall wala custom-stitched lehenga.",
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
    description: "Heavy gold embroidery aur classic bridal detailing wala signature lehenga look.",
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
    title: "Hans Jaisa Safaid — Ivory Bridal Lehenga",
    category: "Bridal",
    description:
      "Ivory aur gold floral embroidery lehenga — handmade pearl latkan tassels aur fine gota-kinari finishing ke saath.",
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
      "Flowing floral-embroidered flared lehenga — back tie-up dori choli aur full gher ke saath stitched.",
    highlights: ["Full flare gher", "Back dori blouse", "Festive twirl look"],
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
      "Deep maroon bridal blouse jiske back par scalloped pearl-edging, heavy zardosi border aur beaded dori latkans hain.",
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
      "Bright rani-pink flare lehenga gold gota border ke saath, embroidered blouse aur ivory scalloped net dupatta.",
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
      "Signature Alia-cut gathered floral cotton dress — breezy day-wear silhouette aur clean tailored sleeves ke saath.",
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
      "Rani-pink kurta aur wide white palazzo set — real mirror-work daman, hem detailing aur V-neck border ke saath.",
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
      "Rich purple blouse heavy sequin aur zardosi motifs ke saath — tailored V-back aur matching embroidered tassels.",
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
      "Kids sleeveless kurti aur wide-leg palazzo set — silver embroidered hem, side dori aur matching scrunchie ke saath.",
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
      "Lilac shimmer silk blouse — sweetheart back cut, beaded piping aur floral resham-sequin embroidered sleeves.",
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
      "Peacock-teal zari aur mirror-work blouse — scalloped back neckline, floral sleeves aur matching dori tassels.",
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
      "Classic Creation By Mohini tailored blouse — rose-gold shimmer tissue par delicate beaded lace finishing.",
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
      "Warm mauve base par multi-color floral resham aur zari embroidery wala festive lehenga-choli set.",
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
      "Traditional forest-green brocade pattu lehenga-choli — golden woven border aur puff-sleeve blouse ke saath.",
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
      "Handblock-inspired black cotton straight kurta aur chevron-print pant set, sleeves aur V-neck par white lace trim ke saath.",
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
      "All-over geometric print tailored kurta-pant co-ord — crisp contrast black piping aur flared bell sleeves ke saath.",
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
      "Cute navy daisy-print strap frock front pleated bow aur white piping ke saath — matching scrunchie included.",
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
      "Sparkling navy foil-dot gathered party frock — crisp contrast neckline piping aur adjustable back bow tie ke saath.",
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
    description: "Aapke design idea ya reference se poora outfit naap ke saath tayaar.",
    image: lookbook.hero,
  },
  {
    name: "Blouse Stitching",
    description:
      "Saree ya lehenga ke liye sweetheart back, pearl cutwork, dori latkans aur heavy zardosi blouses.",
    image: lookbook.blouse,
    category: "Blouses",
  },
  {
    name: "Suit Stitching",
    description:
      "Alia-cut anarkali, mirror-work palazzo aur daily-wear cotton suits aapke fabric par.",
    image: lookbook.suit,
    category: "Suits & Kurtis",
  },
  {
    name: "Lehenga Design",
    description: "Occasion ke hisaab se full-gher festive aur bridal lehenga design & stitching.",
    image: lookbook.lehenga,
    category: "Lehengas",
  },
  {
    name: "Kids Ethnic & Frocks",
    description:
      "Girls party frocks, festive co-ord sets aur matched scrunchies soft finishing ke saath.",
    image: "/instagram/purple-kids-coord.jpg",
    category: "Kids Wear",
  },
  {
    name: "Alterations",
    description: "Pehle se bane outfits, blouses ya lehengas ki precise fitting theek karna.",
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
    title: "Design chunein",
    text: "Lookbook ya Instagram Showcase se apna pasandida outfit chunein.",
  },
  {
    title: "Enquiry bhejein",
    text: "Form bharein ya seedha WhatsApp par design screenshot share karein.",
  },
  {
    title: "Naap share karein",
    text: "Measurement guide dekh kar naap bhejein ya fitting appointment poochhein.",
  },
  {
    title: "Details confirm",
    text: "Designer aapse fabric, delivery date aur design detailing confirm karegi.",
  },
];
