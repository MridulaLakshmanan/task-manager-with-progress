"use client"

export default function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-3 w-full rounded-md bg-muted">
      <div
        className="h-3 rounded-md bg-primary transition-all"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        aria-valuemin={0}
        aria-valuenow={value}
        aria-valuemax={100}
        role="progressbar"
      />
    </div>
  )
}
