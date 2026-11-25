import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { MessageCircle } from "lucide-react";
import { services, whatsappLink } from "@/content/site";
import { PageHeader } from "@/components/site/Layout";
import { validateEnquiry, enquiryMessage, type Enquiry } from "@/lib/enquiry";

type Search = { design?: string; service?: string };

export const Route = createFileRoute("/enquiry")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    ...(typeof s["design"] === "string" ? { design: s["design"] } : {}),
    ...(typeof s["service"] === "string" ? { service: s["service"] } : {}),
  }),
  head: () => ({
    meta: [
      { title: "Order Enquiry — Mohini Creation" },
      {
        name: "description",
        content: "Custom stitching enquiry bhejein — Mohini Creation aapse details confirm karegi.",
      },
      { property: "og:title", content: "Order Enquiry — Mohini Creation" },
      { property: "og:description", content: "Custom stitching enquiry bhejein." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EnquiryPage,
});

const fabricOpts = ["Mere paas fabric hai", "Fabric chahiye", "Abhi decide nahi kiya"];
const measureOpts = ["Mere paas hain", "Appointment chahiye", "Baad mein share karungi"];

function EnquiryPage() {
  const search = Route.useSearch();
  const serviceNames = [...services.map((s) => s.name), "Other"];
  const [f, setF] = useState<Enquiry>({
    name: "",
    phone: "",
    service: search.service && serviceNames.includes(search.service) ? search.service : "",
    design: search.design ?? "",
    occasion: "",
    date: "",
    fabric: "",
    measurements: "",
    notes: "",
    consent: false,
  });
  const [errors, setErrors] = useState<ReturnType<typeof validateEnquiry>>({});
  const [busy, setBusy] = useState(false);
  const [sentLink, setSentLink] = useState<string | null>(null);
  const set = <K extends keyof Enquiry>(k: K, v: Enquiry[K]) => setF((p) => ({ ...p, [k]: v }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;
    const err = validateEnquiry(f);
    setErrors(err);
    if (Object.keys(err).length) {
      document.getElementById(`f-${Object.keys(err)[0]}`)?.focus();
      return;
    }
    setBusy(true);
    const link = whatsappLink(enquiryMessage(f));
    window.open(link, "_blank", "noopener");
    setSentLink(link);
    setBusy(false);
  };

  if (sentLink)
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <p className="eyebrow">Shukriya</p>
        <h1 className="mt-3 font-display text-4xl">
          Aapki enquiry mil gayi. Mohini Creation aapse details confirm karne ke liye contact
          karegi.
        </h1>
        <p className="mt-4 text-muted-foreground">
          Agar WhatsApp nahi khula, neeche button se message bhejein — enquiry tabhi pahunchti hai
          jab WhatsApp message send ho. Order designer ke confirm karne par hi pakka hota hai.
        </p>
        <a href={sentLink} target="_blank" rel="noreferrer" className="btn-primary mt-6">
          <MessageCircle className="h-4 w-4" />
          WhatsApp par bhejein
        </a>
      </div>
    );

  const Err = ({ k }: { k: keyof Enquiry }) =>
    errors[k] ? (
      <p id={`e-${k}`} className="mt-1 text-sm text-destructive">
        {errors[k]}
      </p>
    ) : null;
  const label = "mb-1 block text-sm font-medium";

  return (
    <>
      <PageHeader
        eyebrow="Order Enquiry"
        title="Apni enquiry bhejein"
        text="Form bharne par aapki details WhatsApp message mein tayaar ho jaayengi — bas Send dabayein."
      />
      <form onSubmit={submit} noValidate className="mx-auto grid max-w-2xl gap-5 px-4">
        <div>
          <label htmlFor="f-name" className={label}>
            Naam *
          </label>
          <input
            id="f-name"
            className="field"
            value={f.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={!!errors.name}
            autoComplete="name"
          />
          <Err k="name" />
        </div>
        <div>
          <label htmlFor="f-phone" className={label}>
            WhatsApp / mobile number *
          </label>
          <input
            id="f-phone"
            type="tel"
            inputMode="tel"
            className="field"
            value={f.phone}
            onChange={(e) => set("phone", e.target.value)}
            aria-invalid={!!errors.phone}
            autoComplete="tel"
          />
          <Err k="phone" />
        </div>
        <div>
          <label htmlFor="f-service" className={label}>
            Service / outfit type *
          </label>
          <select
            id="f-service"
            className="field"
            value={f.service}
            onChange={(e) => set("service", e.target.value)}
            aria-invalid={!!errors.service}
          >
            <option value="">Chunein…</option>
            {serviceNames.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <Err k="service" />
        </div>
        <div>
          <label htmlFor="f-design" className={label}>
            Design reference / gallery item
          </label>
          <input
            id="f-design"
            className="field"
            value={f.design}
            onChange={(e) => set("design", e.target.value)}
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="f-occasion" className={label}>
              Occasion
            </label>
            <input
              id="f-occasion"
              className="field"
              value={f.occasion}
              onChange={(e) => set("occasion", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="f-date" className={label}>
              Kab tak chahiye
            </label>
            <input
              id="f-date"
              type="date"
              className="field"
              value={f.date}
              onChange={(e) => set("date", e.target.value)}
            />
          </div>
        </div>
        <fieldset>
          <legend className={label}>Fabric</legend>
          <div className="flex flex-wrap gap-2">
            {fabricOpts.map((o) => (
              <Choice
                key={o}
                name="fabric"
                value={o}
                checked={f.fabric === o}
                onChange={() => set("fabric", o)}
              />
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className={label}>Measurements</legend>
          <div className="flex flex-wrap gap-2">
            {measureOpts.map((o) => (
              <Choice
                key={o}
                name="measure"
                value={o}
                checked={f.measurements === o}
                onChange={() => set("measurements", o)}
              />
            ))}
          </div>
        </fieldset>
        <div>
          <label htmlFor="f-notes" className={label}>
            Notes
          </label>
          <textarea
            id="f-notes"
            rows={4}
            className="field"
            value={f.notes}
            onChange={(e) => set("notes", e.target.value)}
          />
        </div>
        <div>
          <label className="flex items-start gap-3 text-sm">
            <input
              id="f-consent"
              type="checkbox"
              className="mt-1 h-5 w-5 accent-primary"
              checked={f.consent}
              onChange={(e) => set("consent", e.target.checked)}
            />
            Meri di hui details par order ke baare mein contact kiya ja sakta hai.
          </label>
          <Err k="consent" />
        </div>
        <button type="submit" disabled={busy} className="btn-primary w-full sm:w-auto">
          {busy ? "Bhej rahe hain…" : "WhatsApp par enquiry bhejein"}
        </button>
      </form>
    </>
  );
}

function Choice({
  name,
  value,
  checked,
  onChange,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={`cursor-pointer rounded-full border px-4 py-2 text-sm ${checked ? "border-primary bg-accent text-accent-foreground" : "border-border bg-card"}`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      {value}
    </label>
  );
}
