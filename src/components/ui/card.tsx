import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/src/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement>;

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-[var(--color-bg-card)] border-none rounded-[var(--radius-card)] overflow-hidden shadow-[var(--shadow-md)] transition-shadow duration-200 ease-in-out hover:shadow-[var(--shadow-lg)]",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardImage = forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, alt = "", ...props }, ref) => (
  <img
    ref={ref}
    alt={alt}
    className={cn(
      "w-full aspect-square object-cover",
      className
    )}
    {...props}
  />
));
CardImage.displayName = "CardImage";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-4 pb-4 pt-3", className)}
      {...props}
    />
  )
);
CardContent.displayName = "CardContent";

export { Card, CardImage, CardContent };
export type { CardProps };
