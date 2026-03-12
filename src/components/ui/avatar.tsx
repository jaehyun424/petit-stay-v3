import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils";

const avatarVariants = cva(
  "relative inline-flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        sm: "h-10 w-10 text-sm",
        md: "h-14 w-14 text-base",
        lg: "h-24 w-24 text-2xl",
        xl: "h-32 w-32 text-3xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

type AvatarProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> &
  VariantProps<typeof avatarVariants> & {
    src?: string;
    alt?: string;
    fallback: string;
  };

const Avatar = forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, src, alt = "", fallback, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarVariants({ size, className }))}
    {...props}
  >
    <AvatarPrimitive.Image
      src={src}
      alt={alt}
      className="aspect-square h-full w-full object-cover"
    />
    <AvatarPrimitive.Fallback
      className="flex h-full w-full items-center justify-center bg-[var(--color-avatar-fallback-bg)] text-[var(--color-avatar-fallback-text)] font-semibold tracking-[0]"
      delayMs={300}
    >
      {fallback}
    </AvatarPrimitive.Fallback>
  </AvatarPrimitive.Root>
));
Avatar.displayName = "Avatar";

export { Avatar, avatarVariants };
export type { AvatarProps };
