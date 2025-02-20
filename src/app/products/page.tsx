import type { Metadata } from "next"
import { SparklesCore } from "@/components/ui/sparkles"
import ProductGrid from "@/components/product-grid"

export const metadata: Metadata = {
  title: "Products | Express IT BD",
  description: "Browse our collection of products",
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4">
      <div className="w-full absolute inset-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>
        <ProductGrid />
      </div>
    </main>
  )
}

