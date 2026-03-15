"use client"

import { useCategories } from "@/hooks/useCategories"
import Link from "next/link"
import { ArrowRight, Layers } from "lucide-react"

export default function CategoriesPage() {
  const { data, isLoading } = useCategories()

  return (
    <div className="mx-auto max-w-5xl py-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
          Shop by Category
        </h1>
        <p className="mt-4 text-lg text-foreground/70">
          Find exactly what you&apos;re looking for in our curated sections.
        </p>
      </div>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-40 rounded-2xl bg-secondary/50 animate-pulse border border-border" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data?.map((category) => (
            <Link
              key={category.name}
              href={`/products?category=${encodeURIComponent(category.name)}`}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-background p-6 transition-all hover:border-foreground/20 hover:shadow-lg"
            >
              <div className="mb-4 text-foreground/50 group-hover:text-foreground transition-colors">
                <Layers size={32} />
              </div>
              <div>
                <h2 className="text-xl font-bold capitalize text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </h2>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground/60">{category.count} Products</span>
                  <ArrowRight size={16} className="text-foreground/40 transition-transform group-hover:translate-x-2 group-hover:text-foreground" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}