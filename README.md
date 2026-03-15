This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


##*Project Structure*
```

alproshop/
├── app/                          ← Next.js App Router
│   ├── layout.tsx                ← Root layout (Nav/bar, Providers)
│   ├── page.tsx                  ← Home page /
│   ├── products
│   │   ├── page.tsx              ← Products list /products
│   │   └── [id]/
│   │       └── page.tsx          ← Product detail /products/[id]
│   ├── categories/
│   │   └── page.tsx              ← Categories /categories
│   ├── cart/
│   │   └── page.tsx              ← Cart /cart
│   └── architecture/
│       └── page.tsx              ← Arch overview /architecture
│
├── lib/                          ← Layer 1: Infrastructure
│   └── api/
│       ├── client.ts             ← apiClient (fetch wrapper)
│       ├── products.ts           ← ProductAPI.getAll/getById/etc
│       └── cart.ts               ← CartAPI.add
│
├── hooks/                        ← Layer 2: Application (TanStack Query)
│   ├── useProducts.ts            ← useQuery(["products", category])
│   ├── useProduct.ts             ← useQuery(["product", id])
│   ├── useCategories.ts          ← useQuery(["categories"])
│   └── useAddToCart.ts           ← useMutation → POST /carts
│
├── context/                      ← Layer 3: Global State
│   ├── CartContext.tsx            ← useCart(), addItem, removeItem
│   ├── RouterContext.tsx          ← useRouter(), push()
│   └── ToastContext.tsx           ← useToast()
│
├── components/                   ← Layer 4: UI (Presentational)
│   ├── ui/                       ← Reusable primitives
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Skeleton.tsx
│   │   └── Stars.tsx
│   ├── layout/
│   │   └── Navbar.tsx
│   └── product/
│       ├── ProductCard.tsx
│       └── ProductCardSkeleton.tsx
│
├── types/                        ← TypeScript interfaces
│   ├── product.ts                ← Product, Category, Rating
│   └── cart.ts                   ← CartItem, CartPayload
│
└── providers.tsx                 ← Wrap semua Context providers
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

**Teknologi utama:**

Next.js (App Router)

React

TypeScript

TanStack Query

REST API

Context API

TailwindCSS

**1. Next.js Overview**

Next.js adalah React Framework yang menyediakan fitur production seperti:

File-based routing

Server Components

Client Components

Data Fetching

API Routes

Optimized performance

Keuntungan Next.js:

SEO friendly

Automatic code splitting

Hybrid rendering (SSR, SSG, CSR)

Built-in routing

Dalam project ini digunakan Next.js App Router.
**
Folder utama:**

app/
components/
hooks/
lib/
context/
types/

**2. App Router
**
_App Router adalah sistem routing modern di Next.js yang berbasis file system._

Folder:

app/

Setiap folder di dalam app otomatis menjadi route.

Contoh:

app/page.tsx

Route:

/

Contoh lain:

app/products/page.tsx

Route: /products

**3. Routing & Dynamic Routing**
Static Routing

Routing statis dibuat dari struktur folder.

Contoh:

app/products/page.tsx

Route:

/products
Dynamic Routing

Dynamic routing digunakan untuk halaman dengan parameter.

Contoh:

app/products/[id]/page.tsx

Route:

/products/1
/products/2
/products/3

Parameter id diambil menggunakan:

useParams()

Contoh:

const { id } = useParams()

Digunakan untuk fetch product detail.

**4. Component Architecture (Server vs Client)**

Next.js menggunakan dua jenis komponen:

Server Components

Default di Next.js.

Keuntungan:

lebih cepat

tidak dikirim ke browser

lebih kecil bundle size

Biasanya digunakan untuk:

layout

static pages

SEO content

Contoh:

app/layout.tsx
app/page.tsx
Client Components

Digunakan ketika membutuhkan:

state

hooks

event handlers

Harus menggunakan directive:

"use client"

Contoh file:

hooks/useProducts.ts
components/product/ProductCard.tsx
context/CartContext.tsx

Karena menggunakan:

useState
useEffect
useQuery
onClick
**5. Layout System**

File:

app/layout.tsx

Fungsi:

Root layout yang membungkus seluruh aplikasi.

Biasanya berisi:

Navbar

Global providers

Layout structure

Contoh:

<Providers>
  <Navbar />
  <main>{children}</main>
</Providers>

Konsep ini mirip Layout Component di React.

**6. Data Fetching**

Project ini menggunakan TanStack Query untuk data fetching.

Keuntungan:

caching

background refetch

loading states

mutation support

Data fetching tidak dilakukan langsung di component, tetapi melalui custom hooks.

Folder:

hooks/
**7. API Integration (REST)**

Project ini menggunakan REST API.

API yang digunakan:

https://fakestoreapi.com

Struktur API layer:

lib/api

Tujuannya untuk membuat abstraction layer.

File: client.ts

Berfungsi sebagai HTTP client wrapper.

Teori:

membuat reusable fetch function

central error handling

base URL management

Contoh penggunaan:

apiClient("/products")
File: products.ts

Berisi fungsi API khusus untuk produk.

Functions:

getAll()
getById()
getCategories()
getByCategory()

Tujuannya:

memisahkan logic API dari UI

memudahkan maintenance

File: cart.ts

Berisi logic untuk cart API.

Dalam project ini hanya simulasi menggunakan:

setTimeout()

Di production biasanya menggunakan:

POST /cart
**8. TanStack Query**

TanStack Query adalah library untuk server state management.

Digunakan untuk:

data fetching

caching

mutation

synchronization

Folder:

hooks/
useProducts.ts

Digunakan untuk mengambil semua produk.

Query key:

["products"]

Jika ada category:

["products", category]

TanStack Query akan otomatis melakukan:

caching

refetch

loading state

useProduct.ts

Digunakan untuk mengambil detail produk.

Query key:

["product", id]

Digunakan di:

products/[id]
useCategories.ts

Digunakan untuk mengambil semua kategori produk.

Query key:

["categories"]

Digunakan di halaman categories.

useAddToCart.ts

Digunakan untuk mutation.

Menggunakan:

useMutation()

Biasanya digunakan untuk:

POST

PUT

DELETE

**9. Global State Management**

Project ini menggunakan React Context untuk global state.

Folder:

context/
CartContext.tsx

Digunakan untuk menyimpan state cart.

State:

items[]

Functions:

addItem()
removeItem()

Digunakan oleh:

Navbar

Cart page

Product detail

RouterContext.tsx

Wrapper untuk Next.js router.

Memungkinkan router digunakan sebagai global context.

Biasanya digunakan untuk:

push()
navigate()
ToastContext.tsx

Digunakan untuk global notification system.

Function:

show(message)

Dalam project ini masih menggunakan:

alert()

Tetapi di production biasanya menggunakan library seperti:

React Hot Toast

Sonner

**10. Component Architecture**

Folder:

components/

Tujuannya:

memisahkan UI dari logic

membuat reusable components

components/ui

Berisi UI primitives.

Contoh:

Button
Badge
Skeleton
Stars

Komponen ini bersifat reusable.

components/layout

Berisi layout components.

Contoh:

Navbar

Navbar digunakan di seluruh aplikasi.

components/product

Berisi komponen khusus untuk product.

ProductCard.tsx

Menampilkan card produk di marketplace grid.

Berisi:

image
title
price

Card dapat diklik untuk menuju:

/products/[id]
ProductCardSkeleton.tsx

Digunakan ketika data sedang loading.

Menampilkan placeholder UI.

Digunakan untuk meningkatkan UX performance perception.

**11. Styling**

Project ini menggunakan TailwindCSS.

Keuntungan:

utility-first CSS

faster development

responsive design

consistent spacing

Contoh:

grid grid-cols-5 gap-6
rounded-xl
shadow-sm
hover:shadow-lg

**12. Providers System**

File:

providers.tsx

Digunakan untuk membungkus aplikasi dengan berbagai provider.

Providers yang digunakan:

QueryClientProvider
CartProvider
ToastProvider
RouterProvider

Struktur:
```
<QueryClientProvider>
  <ToastProvider>
    <CartProvider>
      <RouterProvider>
        children
      </RouterProvider>
    </CartProvider>
  </ToastProvider>
</QueryClientProvider>
```
Tujuannya agar semua halaman dapat mengakses:

query state

cart state

toast

router

**13. Data Flow**

Alur data dalam aplikasi:
```
Component
↓
Custom Hook
↓
API Layer
↓
External API
```
 flow:
```
ProductsPage
↓
useProducts()
↓
ProductAPI.getAll()
```
**14. Advantages of This Architecture**

Keuntungan architecture ini:

scalable

maintainable

reusable components

clear separation of concerns

easier testing

production-ready pattern

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
