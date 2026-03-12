import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center text-xs font-medium tracking-[0] px-2 py-1 rounded-[var(--radius-badge)] border-0 whitespace-nowrap",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-badge-default-bg)] text-[var(--color-badge-default-text)]",
        verified:
          "bg-[var(--color-badge-verified-bg)] text-[var(--color-badge-verified-text)]",
        language:
          "bg-[var(--color-badge-language-bg)] text-[var(--color-badge-language-text)]",
        certification:
          "bg-[var(--color-badge-cert-bg)] text-[var(--color-badge-cert-text)]",
        top: "bg-[var(--color-badge-top-bg)] text-[var(--color-badge-top-text)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, className }))} {...props} />
  );
}

export { Badge, badgeVariants };
export type { BadgeProps };
