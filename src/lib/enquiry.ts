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
  if (!e.name.trim()) err.name = "Please enter your name.";
  const digits = e.phone.replace(/[\s\-()+]/g, "");
  if (!digits) err.phone = "Please enter your WhatsApp or mobile number.";
  else if (!/^(91)?[6-9]\d{9}$/.test(digits))
    err.phone = "Please enter a valid 10-digit mobile number (e.g. 98765 43210).";
  if (!e.service) err.service = "Please choose a service or outfit type.";
  if (!e.consent) err.consent = "Consent is required to proceed.";
  return err;
}

export function enquiryMessage(e: Enquiry) {
  const lines = [
    "Hello Mohini Creation, new enquiry:",
    `Name: ${e.name}`,
    `Phone: ${e.phone}`,
    `Service: ${e.service}`,
    e.design && `Design: ${e.design}`,
    e.occasion && `Occasion: ${e.occasion}`,
    e.date && `Needed by: ${e.date}`,
    e.fabric && `Fabric: ${e.fabric}`,
    e.measurements && `Measurements: ${e.measurements}`,
    e.notes && `Notes: ${e.notes}`,
  ];
  return lines.filter(Boolean).join("\n");
}
