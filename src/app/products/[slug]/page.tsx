import type { Metadata } from "next"
import ProductDetails from "@/components/product-details"
import { SparklesCore } from "@/components/ui/sparkles"
import { getProductBySlug } from "@/lib/storage"

interface Props {
    params: Promise<{ slug: string }> | { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params
    const product = getProductBySlug(resolvedParams.slug)

    if (!product) {
        return {
            title: 'Product Not Found | Express IT BD',
            description: 'The requested product could not be found.',
        }
    }

    return {
        title: `${product.name} | Express IT BD`,
        description: product.description,
    }
}

export default async function ProductPage({ params }: Props) {
    const resolvedParams = await params
    const decodedSlug = decodeURIComponent(resolvedParams.slug)

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
