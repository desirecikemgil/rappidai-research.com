import { LocalizedSentinelEnginePage } from "@/app/tools/sentinel-engine/page";
import { metadataFor } from "@/lib/metadata";

export const metadata = metadataFor("/tools/sentinel-engine", "de");

export default function GermanSentinelEnginePage() {
  return <LocalizedSentinelEnginePage locale="de" />;
}
