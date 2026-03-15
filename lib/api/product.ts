import { products } from "@/fakedata/fakeproduct"
import { Product } from "@/types/product"

export const ProductAPI = {
  getAll: async (): Promise<Product[]> => {
    return products
  },

  getById: async (id: string): Promise<Product | undefined> => {
    return products.find((p) => p.id === Number(id))
  },

  getCategories: async (): Promise<{ name: string; count: number }[]> => {
    const categories = [...new Set(products.map((p) => p.category))]
    return categories.map((cat) => ({
      name: cat,
      count: products.filter((p) => p.category === cat).length,
    }))
  },

  getByCategory: async (category: string): Promise<Product[]> => {
    return products.filter((p) => p.category === category)
  },
}