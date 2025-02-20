import type { Metadata } from "next"
import ProductDetails from "@/components/product-details"
import { SparklesCore } from "@/components/ui/sparkles"
import { getProductBySlug } from "@/lib/storage"

type Props = {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params: { slug } }: Props): Promise<Metadata> {
    const product = await getProductBySlug(slug)
    return {
        title: product ? `${product.name} | Express IT BD` : 'Product Not Found | Express IT BD',
        description: product ? product.description : 'Product details not found',
    }
}

export default async function ProductPage({ params: { slug } }: Props) {
    const decodedSlug = decodeURIComponent(slug)
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
