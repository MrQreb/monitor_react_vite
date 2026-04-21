import React from "react";
import { cn } from "@/lib/utils";

type CardVariant = "flat" | "glass" | "bordered";
type Radius = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

type ImageVariant = "default" | "soft" | "square";

type ImageCardProps = {
  children: React.ReactNode;
  className?: string;
  variant?: CardVariant;
  radius?: Radius;
};

const cardStyles: Record<CardVariant, string> = {
  flat: "bg-white",
  glass: "bg-white/70 backdrop-blur-md border border-white/30 shadow-sm",
  bordered: "bg-white border border-neutral-200",
};

const radiusStyles: Record<Radius, string> = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-3xl",
};

export function ImageCard({
  children,
  className,
  variant = "flat",
  radius = "2xl",
}: ImageCardProps) {
  return (
    <div
      className={cn(
        "relative w-full my-4 flex justify-center p-4 transition-all",
        cardStyles[variant],
        radiusStyles[radius],
        className
      )}
    >
      {children}
    </div>
  );
}

/* ---------------- IMAGE ---------------- */

type ImageProps = {
  src: string;
  alt?: string;
  className?: string;
  variant?: ImageVariant;
};

const imageStyles: Record<ImageVariant, string> = {
  default: "w-[90%] rounded-2xl object-cover",
  soft: "w-[90%] rounded-xl object-cover shadow-sm",
  square: "w-full rounded-none object-cover",
};

export function Image({
  src,
  alt,
  className,
  variant = "default",
}: ImageProps) {
  const fallback = "/assets/no-image.png";

  return (
    <img
      src={src}
      alt={alt}
      className={cn(
        "transition-all duration-200" ,
        imageStyles[variant],
        className
      )}
      onError={(e) => {
        e.currentTarget.src = fallback;
      }}
    />
  );
}