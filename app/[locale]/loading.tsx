export default function Loading() {
  return (
    <div className="flex h-[60vh] items-center justify-center">
      <div className="flex items-center gap-3 text-[color:var(--color-muted)]">
        <span
          aria-hidden
          className="h-2.5 w-2.5 animate-pulse rounded-full bg-[color:var(--color-teal)]"
        />
        <span
          aria-hidden
          className="h-2.5 w-2.5 animate-pulse rounded-full bg-[color:var(--color-teal)] [animation-delay:120ms]"
        />
        <span
          aria-hidden
          className="h-2.5 w-2.5 animate-pulse rounded-full bg-[color:var(--color-teal)] [animation-delay:240ms]"
        />
        <span className="ml-2 text-sm">Chargement…</span>
      </div>
    </div>
  );
}
