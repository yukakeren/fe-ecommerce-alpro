"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { CartItem } from "@/types/cart"
import { useToast } from "@/context/ToastContext"

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [loaded, setLoaded] = useState(false)
  const { show } = useToast()

  // load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cart")
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CartItem[]
        const normalized = parsed.reduce((acc, item) => {
          const existing = acc.find(i => i.id === item.id)
          const itemQty = item.quantity || 1
          if (existing) {
            existing.quantity += itemQty
          } else {
            acc.push({ ...item, quantity: itemQty })
          }
          return acc
        }, [] as CartItem[])
        
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setItems(normalized)
      } catch (e) {
        console.error("Failed to parse cart JSON", e)
      }
    }
    setLoaded(true)
  }, [])

  // save to localStorage
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("cart", JSON.stringify(items))
    }
  }, [items, loaded])


  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      }
      return [...prev, item]
    })
    show("Item successfully added")
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    )
  }

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used inside CartProvider")
  return ctx
}