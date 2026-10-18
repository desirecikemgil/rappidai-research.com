import type { Metadata } from "next";
import { LocalizedGhostPage } from "@/app/tools/ghost/page";
import { metadataFor } from "@/lib/metadata";

export const metadata: Metadata = metadataFor("/tools/ghost", "de");

export default function GermanGhostPage() {
  return <LocalizedGhostPage locale="de" />;
}
