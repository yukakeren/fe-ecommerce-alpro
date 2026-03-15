"use client"

export function ProductCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background animate-pulse">
      <div className="aspect-square bg-secondary/50" />
      <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
        <div>
          <div className="h-5 w-3/4 rounded bg-secondary/60 mb-2" />
          <div className="h-5 w-1/2 rounded bg-secondary/60" />
          <div className="h-3 w-1/4 rounded bg-secondary/40 mt-3" />
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="h-6 w-16 rounded bg-secondary/60" />
          <div className="h-6 w-12 rounded-full bg-secondary/40" />
        </div>
      </div>
    </div>
  )
}