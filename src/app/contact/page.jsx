import { Suspense } from "react";
import { getPageMetadata } from "@/lib/seoMetadata";
import ContactClient from "./ContactClient";

export const metadata = getPageMetadata("contact", "en", "/contact");

export default function ContactPage() {
  return (
    <Suspense>
      <ContactClient />
    </Suspense>
  );
}
