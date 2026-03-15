"use client"

import { Product } from "@/types/product"
import Link from "next/link"
import Image from "next/image"

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="group block h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background transition-all hover:border-foreground/20 hover:shadow-xl">
        <div className="relative flex aspect-square items-center justify-center bg-secondary/30 p-6 overflow-hidden">
          {/* Subtle hover zoom effect on the image */}
          <Image
            width={300}
            height={300}
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-md"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between p-5">
          <div>
            <h3 className="line-clamp-2 text-base font-semibold text-foreground group-hover:text-primary transition-colors">
              {product.title}
            </h3>
            <p className="mt-1 text-xs text-foreground/50 capitalize tracking-wider">
              {product.category}
            </p>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xl font-black text-foreground">
              ${product.price}
            </p>
            <div className="flex items-center gap-1 text-sm font-medium text-foreground/70 bg-secondary/50 px-2 py-1 rounded-full">
              <span>★</span>
              <span>{product.rating.rate}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}