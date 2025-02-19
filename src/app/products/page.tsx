import type { Metadata } from "next"
import ProductGrid from "@/components/product-grid"

export const metadata: Metadata = {
  title: "Products | Express IT BD",
  description: "Browse our collection of products",
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-muted/40 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>
        <ProductGrid />
      </div>
    </main>
  )
}

