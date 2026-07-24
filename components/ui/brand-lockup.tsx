import Image from "next/image";
import Link from "next/link";

type BrandLockupProps = {
  className?: string;
  priority?: boolean;
  href?: string;
  homeLabel?: string;
  /**
   * Renders the lockup in white for dark surfaces. The source asset is navy,
   * so it is knocked out rather than recoloured — the brand PNGs are
   * provenance-tracked and must not be edited or replaced.
   */
  inverted?: boolean;
};

export function BrandLockup({
  className = "",
  priority = false,
  href = "/",
  homeLabel = "rappidAI research home",
  inverted = false,
}: BrandLockupProps) {
  const image = (
    <Image
      src="/brand/rappidai-research-lockup.png"
      alt="rappidAI research"
      width={1055}
      height={225}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      sizes="(max-width: 640px) 180px, 220px"
      className={`h-auto w-full ${inverted ? "brand-inverted" : ""} ${className}`}
    />
  );

  return href ? (
    <Link
      href={href}
      aria-label={homeLabel}
      className="block w-[clamp(10.8rem,17vw,13.75rem)]"
    >
      {image}
    </Link>
  ) : (
    <div className="w-[clamp(11rem,20vw,15rem)]">{image}</div>
  );
}

export function BrandSymbol({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/brand/rappidai-symbol.png"
      alt=""
      aria-hidden="true"
      width={410}
      height={410}
      sizes="(max-width: 768px) 160px, 280px"
      className={`h-auto w-full ${className}`}
    />
  );
}
