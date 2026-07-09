type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow ? (
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground text-balance">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-lg text-muted text-balance">{description}</p>
      ) : null}
    </div>
  );
}
