import Image from "next/image";

/*
 * Ironproof monogram, logo 09 (retained by Dom on 2026-09-25): brushed steel
 * with the gold bar through the I. A raster for now: the vector redraw is not
 * done yet, and the old chrome <IronProofLogo /> must not stand in for it.
 * Source: ironproof/brand/ironproof-logo09-mark.png, black keyed to alpha.
 */

// Intrinsic size of /media/ironproof-mark.png; the width follows the height.
const SRC_W = 215;
const SRC_H = 416;

type IronproofMarkProps = {
  height: number;
  className?: string;
  title?: string;
  preload?: boolean;
};

export function IronproofMark({ height, className, title, preload = false }: IronproofMarkProps) {
  const safeHeight = Number.isFinite(height) && height > 0 ? height : 40;
  const width = Math.round((safeHeight * SRC_W) / SRC_H);
  return (
    <Image
      src="/media/ironproof-mark.png"
      width={width}
      height={safeHeight}
      alt={title ?? ""}
      aria-hidden={title ? undefined : true}
      className={className}
      preload={preload}
    />
  );
}
