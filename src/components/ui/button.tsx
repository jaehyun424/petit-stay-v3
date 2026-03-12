import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-semibold transition-[background-color,border-color,box-shadow] duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none whitespace-nowrap tracking-[0]",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-cta)] text-[var(--color-cta-text)] hover:bg-[var(--color-cta-hover)]",
        secondary:
          "bg-transparent border border-[var(--color-border-hover)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-page)]",
        ghost:
          "bg-transparent border-none text-[var(--color-text-primary)] underline hover:bg-[var(--color-bg-page)]",
      },
      size: {
        default: "h-12 px-6 text-base rounded-[var(--radius-button)]",
        sm: "h-9 px-4 text-sm rounded-[var(--radius-button)]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
