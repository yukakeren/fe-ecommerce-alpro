import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden">
      {/* Background radial gradient accent */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[40rem] w-[40rem] rounded-full bg-secondary/30 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-5xl font-black tracking-tighter text-foreground sm:text-7xl md:text-8xl">
            Discover Our Merch <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/50">
              Alpro Shop
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-foreground/70 sm:text-xl md:text-2xl font-light">
            Browse our curated collection of premium merch.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-semibold text-background transition-transform hover:scale-105"
            >
              Browse Products
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/categories"
              className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-border bg-background px-8 py-4 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Explore Categories
            </Link>
          </div>
        </div>
      </div>
      
    </section>
  )
}