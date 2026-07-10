import { IconEyeOff, IconRule, IconSeal, IconVerify } from "./icons";

function DiagramBox({
  icon: Icon,
  title,
  subtitle,
  accent,
}: {
  icon: typeof IconRule;
  title: string;
  subtitle: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`flex flex-1 flex-col items-center gap-3 rounded-lg border p-6 text-center ${
        accent
          ? "border-accent/40 bg-accent/5"
          : "border-border bg-surface-2"
      }`}
    >
      <Icon
        className={`h-6 w-6 ${accent ? "text-accent" : "text-muted"}`}
      />
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="text-xs leading-relaxed text-muted">{subtitle}</p>
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex items-center justify-center text-muted/50">
      <span className="text-xl leading-none rotate-90 md:rotate-0">→</span>
    </div>
  );
}

function OutcomeBox({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof IconEyeOff;
  label: string;
  value: string;
  tone: "warn" | "seal";
}) {
  const toneClasses =
    tone === "warn"
      ? { border: "border-rose-400/30", bg: "bg-rose-400/5", text: "text-rose-400" }
      : { border: "border-seal/30", bg: "bg-seal/5", text: "text-seal" };

  return (
    <div
      className={`flex items-center gap-3 rounded-lg border p-4 ${toneClasses.border} ${toneClasses.bg}`}
    >
      <Icon className={`h-5 w-5 shrink-0 ${toneClasses.text}`} />
      <div>
        <p className="text-xs text-muted">{label}</p>
        <p className={`text-sm font-medium ${toneClasses.text}`}>{value}</p>
      </div>
    </div>
  );
}

export function SolutionDiagram() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <DiagramBox
        icon={IconRule}
        title="Rules"
        subtitle="Security, compliance & governance constraints"
      />
      <Arrow />
      <DiagramBox
        icon={IconVerify}
        title="Verification"
        subtitle="Checked over the defined input space"
        accent
      />
      <Arrow />
      <div className="flex flex-1 flex-col gap-3">
        <OutcomeBox
          icon={IconEyeOff}
          label="Violation possible"
          value="Counterexample"
          tone="warn"
        />
        <OutcomeBox
          icon={IconSeal}
          label="No violation found"
          value="Sealed proof artifact"
          tone="seal"
        />
      </div>
    </div>
  );
}
