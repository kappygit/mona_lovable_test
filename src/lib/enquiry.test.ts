import { describe, expect, it } from "vitest";
import { validateEnquiry, enquiryMessage, type Enquiry } from "./enquiry";
const base: Enquiry = {
  name: "Asha",
  phone: "98765 43210",
  service: "Blouse Stitching",
  design: "",
  occasion: "",
  date: "",
  fabric: "",
  measurements: "",
  notes: "",
  consent: true,
};
describe("enquiry", () => {
  it("accepts a valid enquiry", () => expect(validateEnquiry(base)).toEqual({}));
  it("requires name, service and consent", () => {
    const e = validateEnquiry({ ...base, name: " ", service: "", consent: false });
    expect(Object.keys(e).sort()).toEqual(["consent", "name", "service"]);
  });
  it("rejects bad phone numbers", () =>
    expect(validateEnquiry({ ...base, phone: "12345" }).phone).toBeDefined());
  it("accepts +91 prefix", () =>
    expect(validateEnquiry({ ...base, phone: "+91 7878096752" }).phone).toBeUndefined());
  it("includes the design name in the message", () =>
    expect(enquiryMessage({ ...base, design: "Rose Anarkali" })).toContain(
      "Design: Rose Anarkali",
    ));
});
