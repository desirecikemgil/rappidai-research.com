import { ActionLink } from "@/components/ui/action-link";

export default function GermanNotFound() {
  return (
    <section className="page-shell flex min-h-[70svh] flex-col justify-center py-24">
      <p className="eyebrow">404 · Nicht gefunden</p>
      <h1 className="display-page mt-7 max-w-[14ch]">
        Diese Seite gibt es nicht.
      </h1>
      <p className="body-lg mt-6 max-w-xl">
        Vielleicht wurde sie verschoben, oder die Adresse ist unvollständig.
      </p>
      <div className="mt-9">
        <ActionLink href="/de">Zur Startseite</ActionLink>
      </div>
    </section>
  );
}
