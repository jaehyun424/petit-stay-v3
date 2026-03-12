import { forwardRef, type InputHTMLAttributes, useId } from "react";
import { cn } from "@/src/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  helperText?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id: idProp, ...props }, ref) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;

    return (
      <div className="flex flex-col">
        {label && (
          <label
            htmlFor={id}
            className="mb-2 text-xs font-semibold tracking-[0] text-[var(--color-text-primary)]"
          >
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={
            error ? errorId : helperText ? helperId : undefined
          }
          className={cn(
            "h-14 px-4 text-base tracking-[0] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-weak)] bg-[var(--color-bg)] border border-[var(--color-border)] rounded-[var(--radius-input)] outline-none transition-[border-color] duration-200 ease-in-out",
            "focus:border-2 focus:border-[var(--color-border-hover)] focus:px-[15px]",
            error &&
              "border-2 border-[var(--color-error)] px-[15px] focus:border-[var(--color-error)]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            className
          )}
          {...props}
        />
        {error && (
          <p
            id={errorId}
            role="alert"
            className="mt-2 text-xs tracking-[0] text-[var(--color-error)]"
          >
            {error}
          </p>
        )}
        {!error && helperText && (
          <p
            id={helperId}
            className="mt-2 text-xs tracking-[0] text-[var(--color-text-secondary)]"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
export type { InputProps };
