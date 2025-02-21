"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Heart, Loader2, ShoppingCart, Play, Share2 } from "lucide-react"
import { getProductBySlug, setProducts, createSlug } from "@/lib/storage"
import axios from "axios"

import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface Product {
  _id: string
  name: string
  price: string
  description: string
  category: {
    _id: string
    name: string
  }
  images: {
    public_id: string
    secure_url: string
    optimizeUrl: string
  }[]
  video: {
    public_id: string
    secure_url: string
  }
  status: boolean
}

export default function ProductDetails({ slug }: { slug: string }) {
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedImage, setSelectedImage] = useState("")
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const foundProduct = getProductBySlug(slug)

        if (foundProduct) {
          setProduct(foundProduct)
          setSelectedImage(foundProduct.images[0]?.secure_url)
        } else {
          const response = await axios.get("https://glore-bd-backend-node-mongo.vercel.app/api/product")
          if (response.data?.data) {
            const products = response.data.data
            // Save to localStorage
            setProducts(products)
            // Find the product by slug
            const product = products.find((p: Product) => createSlug(p.name) === slug)
            if (product) {
              setProduct(product)
              setSelectedImage(product.images[0]?.secure_url)
            } else {
              setError("Product not found")
            }
          }
        }
      } catch (err) {
        setError("Failed to load product details")
        console.error("Error loading product:", err)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [slug])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="text-center">
        <p className="text-red-500 mb-4">{error || "Product not found"}</p>
        <Button onClick={() => router.back()} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
      <Button
        onClick={() => router.back()}
        variant="ghost"
        className="mb-6 text-white hover:bg-white/20"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Images */}
        <div className="space-y-4">
          <div className="aspect-square relative rounded-lg overflow-hidden bg-black/20">
            {showVideo ? (
              <video
                src={product?.video.secure_url}
                controls
                className="w-full h-full object-contain"
              />
            ) : (
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt={product?.name || "Product"}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {product?.images.map((image) => (
              <button
                key={image.public_id}
                onClick={() => {
                  setSelectedImage(image.secure_url)
                  setShowVideo(false)
                }}
                className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 
                  ${selectedImage === image.secure_url ? 'ring-2 ring-blue-500' : ''}`}
              >
                <Image
                  src={image.secure_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
            {product?.video && (
              <button
                onClick={() => setShowVideo(true)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-black/20
                  ${showVideo ? 'ring-2 ring-blue-500' : ''} hover:bg-black/40 transition-colors`}
              >
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <video
                  src={product.video.secure_url}
                  className="w-full h-full object-cover"
                />
              </button>
            )}
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">{product?.name}</h1>
            <p className="text-white/60">
              Category: <span className="text-white">{product?.category.name}</span>
            </p>
          </div>

          <Separator className="bg-white/20" />

          <div className="space-y-4">
            <div className="text-3xl font-bold text-white">
              ৳{product?.price && parseInt(product.price).toLocaleString()}
            </div>

            {/* Updated button layout */}
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-col">
              <Button
                className="h-12 sm:h-14 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-base sm:text-lg"
              >
                Buy Now
              </Button>
              <Button
                className="h-12 sm:h-14 w-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center gap-2 font-semibold text-base sm:text-lg"
                variant="secondary"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="hidden xs:inline">Add to Cart</span>
                <span className="inline xs:hidden">Cart</span>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="h-12 flex items-center justify-center gap-2 text-white hover:bg-white/10 border-white/20"
              >
                <Heart className="h-5 w-5" />
                <span className="hidden xs:inline">Wishlist</span>
              </Button>
              <Button
                variant="outline"
                className="h-12 flex items-center justify-center gap-2 text-white hover:bg-white/10 border-white/20"
              >
                <Share2 className="h-5 w-5" />
                <span className="hidden xs:inline">Share</span>
              </Button>
            </div>
          </div>

          <Separator className="bg-white/20" />

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">About this item</h2>
            <p className="text-white/70 leading-relaxed">{product?.description}</p>
          </div>

          <div className="space-y-2 text-sm text-white/50">
            <p>Product ID: {product?._id}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

