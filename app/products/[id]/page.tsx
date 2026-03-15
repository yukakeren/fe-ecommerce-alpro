"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import { Star, ArrowLeft, ShoppingBag } from "lucide-react"
import { useProduct } from "@/hooks/useProduct"
import { useCart } from "@/context/CartContext"
import Link from "next/link"

export default function ProductDetailPage() {
  const { id } = useParams()
  const { data } = useProduct(id as string)
  const { addItem } = useCart()

  if (!data) return (
    <div className="flex h-[50vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-foreground border-t-transparent" />
    </div>
  )

  return (
    <div className="mx-auto max-w-6xl py-10">
      <Link href="/products" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground">
        <ArrowLeft size={16} />
        Back to Products
      </Link>

      <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
        <div className="flex items-center justify-center rounded-3xl border border-border bg-secondary/30 p-10 overflow-hidden relative group">
          <Image 
            src={data.image}
            alt={data.title}
            width={500}
            height={500}
            className="object-contain transition-transform duration-500 hover:scale-110 drop-shadow-xl"
          />
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-foreground">
              {data.category}
            </span>
            <div className="flex items-center gap-1 text-sm font-medium text-foreground/70 bg-secondary/50 px-2 py-1 rounded-full">
              <Star size={14} className="fill-foreground text-foreground" />
              <span>{data.rating.rate.toFixed(1)}</span>
              <span className="opacity-50">({data.rating.count})</span>
            </div>
          </div>

          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            {data.title}
          </h1>

          <p className="mb-8 text-lg leading-relaxed text-foreground/70">
            {data.description}
          </p>

          <div className="mb-8 flex items-end gap-4">
            <p className="text-5xl font-black text-foreground">
              ${data.price}
            </p>
          </div>

          <button
            onClick={() =>
              addItem({
                id: data.id,
                title: data.title,
                price: data.price,
                image: data.image,
                quantity: 1,
              })
            }
            className="group flex w-full md:w-auto items-center justify-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-bold text-background transition-transform hover:scale-105"
          >
            <ShoppingBag size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}