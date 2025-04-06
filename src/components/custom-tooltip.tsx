// CustomTooltip.tsx
export function CustomTooltipContent({ active, payload, label }: any) {
  if (!active || !payload || !Array.isArray(payload) || payload.length === 0) {
    return null;
  }

  const totalCommits = payload.reduce((sum: number, entry: any) => {
    const value = entry && typeof entry.value === "number" ? entry.value : 0;
    return sum + value;
  }, 0);

  return (
    <div className="rounded-md border bg-white p-3 shadow-sm">
      <div className="font-medium">Week of {label}</div>
      <div className="font-bold text-lg">{totalCommits} total commits</div>
      <div className="mt-2 space-y-1">
        {payload.map((entry: any) => {
          if (!entry || typeof entry.value !== "number" || entry.value <= 0) {
            return null;
          }

          return (
            <div
              key={entry.name || "unknown"}
              className="flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-1">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: entry.fill || "#888" }}
                />
                <span>{entry.name || "Unknown"}:</span>
              </div>
              <span className="font-medium">{entry.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
