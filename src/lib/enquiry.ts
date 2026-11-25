export type Enquiry = {
  name: string;
  phone: string;
  service: string;
  design: string;
  occasion: string;
  date: string;
  fabric: string;
  measurements: string;
  notes: string;
  consent: boolean;
};

export function validateEnquiry(e: Enquiry) {
  const err: Partial<Record<keyof Enquiry, string>> = {};
  if (!e.name.trim()) err.name = "Kripya apna naam likhein.";
  const digits = e.phone.replace(/[\s\-()+]/g, "");
  if (!digits) err.phone = "Kripya WhatsApp/mobile number likhein.";
  else if (!/^(91)?[6-9]\d{9}$/.test(digits))
    err.phone = "Sahi 10-digit mobile number likhein (jaise 98765 43210).";
  if (!e.service) err.service = "Kripya service ya outfit type chunein.";
  if (!e.consent) err.consent = "Aage badhne ke liye consent zaroori hai.";
  return err;
}

export function enquiryMessage(e: Enquiry) {
  const lines = [
    "Namaste Mohini Creation, nayi enquiry:",
    `Naam: ${e.name}`,
    `Number: ${e.phone}`,
    `Service: ${e.service}`,
    e.design && `Design: ${e.design}`,
    e.occasion && `Occasion: ${e.occasion}`,
    e.date && `Kab tak chahiye: ${e.date}`,
    e.fabric && `Fabric: ${e.fabric}`,
    e.measurements && `Measurements: ${e.measurements}`,
    e.notes && `Notes: ${e.notes}`,
  ];
  return lines.filter(Boolean).join("\n");
}
