import type { Metadata } from "next"
import ProductDetails from "@/components/product-details"

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: "Product Details | Express IT BD",
    description: "View detailed product information",
  }
}

export default function ProductPage({ params }: Props) {
  return (
    <main className="min-h-screen bg-muted/40 py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <ProductDetails id={params.id} />
      </div>
    </main>
  )
}

