import type { Metadata } from "next"
import ProductDetails from "@/components/product-details"
import { SparklesCore } from "@/components/ui/sparkles"

export const metadata: Metadata = {
    title: 'Product Details | Express IT BD',
    description: 'View product details',
}

export default function ProductPage({ params }: { params: { slug: string } }) {
    const decodedSlug = decodeURIComponent(params.slug)

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4">
            <div className="w-full absolute inset-0">
                <SparklesCore
                    id="tsparticlesfullpage"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={100}
                    className="w-full h-full fixed"
                    particleColor="#FFFFFF"
                />
            </div>
            <div className="container max-w-4xl mx-auto px-4">
                <ProductDetails slug={decodedSlug} />
            </div>
        </main>
    )
}
