import type { Metadata } from "next";
import { LocalizedReplayPage } from "@/app/tools/replay/page";
import { metadataFor } from "@/lib/metadata";

export const metadata: Metadata = metadataFor("/tools/replay", "de");

export default function GermanReplayPage() {
  return <LocalizedReplayPage locale="de" />;
}
