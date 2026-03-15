type ConditionSummaryProps = {
  labels: string[];
};

export function ConditionSummary({ labels }: ConditionSummaryProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {labels.map((label) => (
        <span
          key={label}
          className="inline-flex rounded-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.06)] px-3 py-1 text-xs text-[var(--color-muted)]"
        >
          {label}
        </span>
      ))}
    </div>
  );
}

