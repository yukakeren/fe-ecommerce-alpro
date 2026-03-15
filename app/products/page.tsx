"use client"

import { useProducts } from "@/hooks/useProducts"
import { ProductCard } from "@/components/product/ProductCard"
import { ProductCardSkeleton } from "@/components/product/ProductCardSkeleton"
import { useSearchParams } from "next/navigation"
import { useState, useMemo, Suspense } from "react"
import { Search } from "lucide-react"

function ProductsContent() {
  const searchParams = useSearchParams()
  const category = searchParams.get("category") ?? undefined
  const { data, isLoading } = useProducts(category)
  
  const [searchQuery, setSearchQuery] = useState("")

  const filteredData = useMemo(() => {
    if (!data) return []
    if (!searchQuery.trim()) return data
    
    return data.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [data, searchQuery])

  return (
    <div className="mx-auto max-w-7xl py-10 space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            {category ? <span className="capitalize">{category}</span> : "All Products"}
          </h1>
          <p className="mt-2 text-lg text-foreground/70">
            {category 
              ? `Showing all products in the ${category} category.` 
              : "Explore our complete collection of minimalist essentials."}
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <Search size={18} className="text-foreground/40" />
          </div>
          <input
            type="text"
            className="w-full rounded-full border border-border bg-background py-3 pl-12 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-foreground/40 focus:border-foreground/30 focus:ring-1 focus:ring-foreground/30"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredData.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-secondary/20">
          <Search size={48} className="mb-4 text-foreground/20" />
          <p className="text-xl font-medium text-foreground/60">No products found</p>
          <p className="text-sm text-foreground/40">Try adjusting your search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredData.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="flex h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-foreground border-t-transparent" />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  )
}