import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Card, CardContent } from "./card";
import { Badge } from "./badge";

const meta = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/** CSS placeholder for card images (no external URLs) */
function CardImagePlaceholder() {
  return (
    <div
      className="w-full aspect-square flex items-center justify-center"
      style={{ background: "var(--color-avatar-bg)" }}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="12" cy="8" r="4" fill="var(--color-avatar-text)" />
        <path
          d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8"
          fill="var(--color-avatar-text)"
        />
      </svg>
    </div>
  );
}

export const Default: Story = {
  args: {},
  render: () => (
    <div className="max-w-xs">
      <Card>
        <CardContent className="p-4">
          <p className="text-base text-[var(--color-text-primary)]">
            기본 카드 컴포넌트입니다.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const SitterCard: Story = {
  args: {},
  render: () => (
    <div className="max-w-xs">
      <Card>
        <CardImagePlaceholder />
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-[var(--color-text-primary)]">
              Emily K.
            </span>
            <span className="flex items-center gap-1 text-sm">
              <span className="font-semibold text-[var(--color-text-primary)]">★ 4.92</span>
              <span className="text-[var(--color-text-secondary)]">(47)</span>
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            <Badge variant="verified">Verified</Badge>
            <Badge variant="language">L3 English</Badge>
          </div>
          <div className="mt-2">
            <span className="text-base font-semibold text-[var(--color-text-primary)]">
              25,000
            </span>
            <span className="text-sm text-[var(--color-text-secondary)]">
              원/시간
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};

export const CardGrid: Story = {
  args: {},
  render: () => (
    <div className="grid grid-cols-2 gap-6 max-w-2xl">
      {[
        {
          name: "Emily K.",
          rating: "4.92",
          reviews: 47,
          badges: [
            { variant: "verified" as const, label: "Verified" },
            { variant: "language" as const, label: "L3 English" },
          ],
          rate: "25,000",
        },
        {
          name: "Sarah L.",
          rating: "4.85",
          reviews: 32,
          badges: [
            { variant: "verified" as const, label: "Verified" },
            { variant: "language" as const, label: "L2 Japanese" },
          ],
          rate: "30,000",
        },
        {
          name: "Mika T.",
          rating: "4.97",
          reviews: 61,
          badges: [
            { variant: "verified" as const, label: "Verified" },
            { variant: "certification" as const, label: "CPR" },
          ],
          rate: "28,000",
        },
        {
          name: "Yuna P.",
          rating: "4.78",
          reviews: 19,
          badges: [
            { variant: "verified" as const, label: "Verified" },
          ],
          rate: "22,000",
        },
      ].map((sitter) => (
        <Card key={sitter.name}>
          <CardImagePlaceholder />
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-[var(--color-text-primary)]">
                {sitter.name}
              </span>
              <span className="flex items-center gap-1 text-sm">
                <span className="font-semibold text-[var(--color-text-primary)]">
                  ★ {sitter.rating}
                </span>
                <span className="text-[var(--color-text-secondary)]">
                  ({sitter.reviews})
                </span>
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {sitter.badges.map((badge) => (
                <Badge key={badge.label} variant={badge.variant}>
                  {badge.label}
                </Badge>
              ))}
            </div>
            <div className="mt-2">
              <span className="text-base font-semibold text-[var(--color-text-primary)]">
                {sitter.rate}
              </span>
              <span className="text-sm text-[var(--color-text-secondary)]">
                원/시간
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};
