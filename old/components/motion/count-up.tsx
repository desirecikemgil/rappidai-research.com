type CountUpProps = {
  value: number;
  decimals?: number;
  locale?: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

/** Numeric evidence is rendered immediately and never occupies the main thread. */
export function CountUp({
  value,
  decimals = 0,
  locale = "en",
  prefix = "",
  suffix = "",
  className,
}: CountUpProps) {
  const formatted = value.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return <span className={className}>{`${prefix}${formatted}${suffix}`}</span>;
}
