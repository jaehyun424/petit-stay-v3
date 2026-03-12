export function Logo({ className, variant = "default" }: { className?: string; variant?: "default" | "white" }) {
  const petitColor = variant === "white" ? "#FFFFFF" : "#222222";
  const stayColor = variant === "white" ? "#E8D5C4" : "#C4956A";

  return (
    <svg
      viewBox="0 0 120 24"
      height="24"
      fill="none"
      className={className}
      aria-label="Petit Stay"
      role="img"
    >
      <text
        x="0"
        y="19"
        fontFamily="'Lora', Georgia, 'Times New Roman', serif"
        fontSize="20"
        fontWeight="700"
        letterSpacing="-0.5"
      >
        <tspan fill={petitColor}>Petit</tspan>
        <tspan fill={stayColor}>{" "}Stay</tspan>
      </text>
    </svg>
  );
}
