import Image from "next/image";

/**
 * Optional artwork column next to a page hero. Renders nothing when the slot
 * is empty so the text column simply keeps the full width.
 */
export const HeroArt = ({ src, alt }: { src?: string; alt: string }) => {
  if (!src) return null;
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-black/8 shadow-[0_24px_60px_-30px_rgba(99,102,241,0.45)]">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="(min-width: 1024px) 45vw, 100vw"
        className="object-cover"
      />
    </div>
  );
};

/** Grid wrapper that switches to two columns only when artwork exists. */
export const HeroGrid = ({
  art,
  children,
}: {
  art: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className={`grid items-center gap-12 ${art ? "lg:grid-cols-[1.1fr_1fr]" : ""}`}>
    <div className="max-w-3xl">{children}</div>
    {art}
  </div>
);
