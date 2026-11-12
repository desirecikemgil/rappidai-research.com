import type { Metadata } from "next";
import { LocalizedToolsPage } from "@/app/tools/view";
import { metadataFor } from "@/lib/metadata";

export const metadata: Metadata = metadataFor("/tools", "de");

export default function GermanToolsPage() {
  return <LocalizedToolsPage locale="de" />;
}
