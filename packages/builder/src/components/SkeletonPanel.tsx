export function SkeletonPanel() {
  return (
    <div className="space-y-3 p-3 animate-pulse">
      <div className="h-4 bg-knit-bg-hover rounded w-1/2" />
      <div className="h-8 bg-knit-bg-hover rounded w-full" />
      <div className="h-8 bg-knit-bg-hover rounded w-3/4" />
      <div className="h-8 bg-knit-bg-hover rounded w-full" />
      <div className="h-8 bg-knit-bg-hover rounded w-2/3" />
    </div>
  );
}
