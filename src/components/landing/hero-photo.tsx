import Image from "next/image";

/*
 * A sub-page hero photograph on the right, melted into the page black on its
 * left and bottom edges so the headline never sits on a hard frame line.
 * Desktop only (lg+): on a phone the statement comes first, the page is long
 * enough. Brought back for /pilot and /actions (Dom, 2026-09-27): photos the
 * home no longer carried, placed where their subject is the page's subject.
 */
export function HeroPhoto({ src, position = "50% 50%" }: { src: string; position?: string }) {
  return (
    <div
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] lg:block"
      aria-hidden="true"
      style={{
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0%, #000 38%), linear-gradient(180deg, #000 70%, transparent 100%)",
        WebkitMaskComposite: "source-in",
        maskImage:
          "linear-gradient(90deg, transparent 0%, #000 38%), linear-gradient(180deg, #000 70%, transparent 100%)",
        maskComposite: "intersect",
      }}
    >
      <Image src={src} alt="" fill sizes="46vw" className="object-cover opacity-80" style={{ objectPosition: position }} />
    </div>
  );
}
