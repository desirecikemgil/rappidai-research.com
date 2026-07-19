import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type ActionLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "text";
  external?: boolean;
  className?: string;
};

const variantClasses = {
  primary:
    "bg-ink text-white border-ink hover:bg-accent hover:border-accent focus-visible:bg-accent focus-visible:border-accent",
  secondary:
    "liquid-button-secondary bg-white text-ink border-line-strong hover:border-ink focus-visible:border-ink",
  text: "border-transparent text-ink px-0 hover:text-accent focus-visible:text-accent",
};

export function ActionLink({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: ActionLinkProps) {
  const classes = `link-arrow liquid-button inline-flex min-h-12 items-center justify-center gap-2.5 border px-5 text-[0.88rem] font-medium tracking-[-0.01em] transition-colors duration-200 ${variantClasses[variant]} ${className}`;
  const icon = external ? <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.8} /> : <ArrowRight aria-hidden="true" size={16} strokeWidth={1.8} />;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {children}
        {icon}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
      {icon}
    </Link>
  );
}

export function PendingAction({ children }: { children: ReactNode }) {
  return (
    <span
      aria-disabled="true"
      className="liquid-pill inline-flex min-h-12 cursor-not-allowed items-center justify-center gap-2 border border-line bg-pale-soft px-5 text-[0.88rem] font-medium text-muted"
    >
      {children}
    </span>
  );
}
