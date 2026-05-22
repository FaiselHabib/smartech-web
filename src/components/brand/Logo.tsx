import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Smartech inline logo built from the official brand assets in `/public/brand/`.
 * - Icon (mint mark): `icon-mint.png` (1000x1000 — IMG_3261)
 * - Horizontal: `logo-horizontal.png` (mint icon + dark teal wordmark on white)
 * - Horizontal dark bg: `logo-horizontal-on-dark.png` (mint icon + white wordmark)
 *
 * Do NOT redesign the mark or generate alternative shapes.
 */
export function Logo({
  className,
  variant = "default",
  showText = true,
  size = 36,
}: {
  className?: string;
  variant?: "default" | "light";
  showText?: boolean;
  size?: number;
}) {
  const textColor = variant === "light" ? "text-white" : "text-brand-teal";
  return (
    <Link
      href="/"
      aria-label="سمارتك جروب"
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <BrandIcon size={size} />
      {showText && (
        <span
          className={cn(
            "text-2xl font-extrabold tracking-tight",
            textColor,
          )}
        >
          smartech<span className="text-brand-mint">.</span>
        </span>
      )}
    </Link>
  );
}

/**
 * Renders the official Smartech mint icon mark from /public/brand/icon-mint.png.
 * Use this everywhere the brain/S symbol is needed.
 */
export function BrandIcon({
  size = 40,
  className,
  priority = false,
}: {
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/brand/icon-mint.png"
      alt="Smartech"
      width={size}
      height={size}
      priority={priority}
      className={cn("select-none", className)}
      sizes={`${size}px`}
    />
  );
}
