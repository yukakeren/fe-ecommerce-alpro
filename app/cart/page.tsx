"use client"

import { useCart } from "@/context/CartContext"
import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Trash2, ShoppingBag, ArrowRight, Plus, Minus } from "lucide-react"

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCart()
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  // Toggle individual item selection
  const toggleSelection = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  // Toggle select all items
  const toggleAll = () => {
    if (selectedIds.length === items.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(items.map((item) => item.id))
    }
  }

  // Calculate total of selected items
  const selectedTotal = useMemo(() => {
    return items
      .filter((item) => selectedIds.includes(item.id))
      .reduce((total, item) => total + (item.price * item.quantity), 0)
  }, [items, selectedIds])

  if (items.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-6 py-10">
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-secondary/30">
          <ShoppingBag size={48} className="text-foreground/30" />
        </div>
        <h1 className="text-3xl font-extrabold text-foreground">Your cart is empty</h1>
        <p className="text-foreground/70">Looks like you haven&apos;t added anything yet.</p>
        <Link
          href="/products"
          className="group mt-4 flex items-center gap-2 rounded-full bg-foreground px-8 py-3 text-sm font-semibold text-background transition-transform hover:scale-105"
        >
          Start Shopping
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl py-10">
      <h1 className="mb-8 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
        Shopping Cart
      </h1>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Left Column: Cart Items */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between rounded-xl border border-border bg-background p-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-border text-primary accent-foreground"
                checked={selectedIds.length === items.length && items.length > 0}
                onChange={toggleAll}
              />
              <span className="font-semibold text-foreground">Select All ({items.length})</span>
            </div>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl border border-border bg-background p-4 transition-all hover:border-foreground/20 hover:shadow-md sm:p-6"
              >
                <input
                  type="checkbox"
                  className="mt-2 sm:mt-0 h-5 w-5 shrink-0 rounded border-border text-primary accent-foreground"
                  checked={selectedIds.includes(item.id)}
                  onChange={() => toggleSelection(item.id)}
                />

                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-secondary/30 overflow-hidden relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-2"
                  />
                </div>

                <div className="flex flex-1 w-full flex-col justify-between sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <h3 className="line-clamp-2 text-lg font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-2xl font-black text-foreground">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-sm font-medium text-foreground/50">
                        ${item.price.toFixed(2)} each
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 rounded-full border border-border bg-secondary/20 p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-background text-foreground shadow-sm transition-colors hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-4 text-center text-sm font-bold text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-background text-foreground shadow-sm transition-colors hover:bg-secondary"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        removeItem(item.id)
                        setSelectedIds((prev) => prev.filter((id) => id !== item.id))
                      }}
                      className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/50 text-foreground transition-colors hover:bg-red-500/10 hover:text-red-500"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} className="transition-transform group-hover:scale-110" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="w-full lg:w-[380px]">
          <div className="sticky top-24 rounded-2xl border border-border bg-background p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold text-foreground">Order Summary</h2>

            <div className="space-y-4 border-b border-border pb-6 text-foreground/80">
              <div className="flex justify-between">
                <span>Selected Items ({selectedIds.length})</span>
                <span className="font-medium text-foreground">${selectedTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium text-foreground text-green-500">Free</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <span className="text-lg font-bold text-foreground">Subtotal</span>
              <span className="text-3xl font-black text-foreground">${selectedTotal.toFixed(2)}</span>
            </div>

            <button
              disabled={selectedIds.length === 0}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-8 py-4 font-bold text-background transition-transform disabled:cursor-not-allowed disabled:opacity-50 hover:not-disabled:scale-[1.02]"
            >
              Checkout Now
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}