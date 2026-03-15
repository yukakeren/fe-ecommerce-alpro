"use client"

import Link from "next/link"
import { useCart } from "@/context/CartContext"
import { useTheme } from "next-themes"
import { Sun, Moon, ShoppingCart } from "lucide-react"
import { useEffect, useState } from "react"

export function Navbar() {
  const { items } = useCart()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch by ensuring component is mounted before rendering theme toggle
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-2xl font-black tracking-tighter text-foreground transition-colors hover:text-foreground/80">
          AlproShop<span className="text-secondary-foreground">.</span>
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/products" className="text-foreground/80 transition-colors hover:text-foreground">
            Products
          </Link>
          <Link href="/categories" className="text-foreground/80 transition-colors hover:text-foreground">
            Categories
          </Link>

          <Link
            href="/cart"
            className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-primary transition-colors hover:bg-secondary/80"
          >
            <ShoppingCart size={16} />
            <span>{items.reduce((acc, i) => acc + i.quantity, 0)}</span>
          </Link>

          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary transition-colors hover:bg-secondary/80"
              aria-label="Toggle Dark Mode"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}