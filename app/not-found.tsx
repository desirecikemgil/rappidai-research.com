import { ActionLink } from "@/components/ui/action-link";

export default function NotFound() {
  return (
    <section className="page-shell flex min-h-[68svh] flex-col justify-center py-24">
      <p className="eyebrow">404 · NOT FOUND</p>
      <h1 className="display-page mt-7">This route is outside the experiment.</h1>
      <p className="body-lg mt-7 max-w-xl">The page may have moved, or the address may be incomplete.</p>
      <div className="mt-9">
        <ActionLink href="/">Return home</ActionLink>
      </div>
    </section>
  );
}
