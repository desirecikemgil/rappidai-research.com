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

export function ActionLink({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: ActionLinkProps) {
  const classes = `btn btn-${variant} link-arrow ${className}`;
  const icon = external ? (
    <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.7} />
  ) : (
    <ArrowRight aria-hidden="true" size={16} strokeWidth={1.7} />
  );

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
    <span aria-disabled="true" className="btn btn-pending">
      {children}
    </span>
  );
}
