"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Loader2 } from "lucide-react"
import { getProduct } from "@/lib/storage"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

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

export default function ProductDetails({ id }: { id: string }) {
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadProduct = () => {
      try {
        const foundProduct = getProduct(id)
        if (foundProduct) {
          setProduct(foundProduct)
        } else {
          setError("Product not found")
        }
      } catch (err) {
        setError("Failed to load product details")
        console.error("Error loading product:", err)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
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
    <Card>
      <CardHeader>
        <Button onClick={() => router.back()} variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>
        <div className="aspect-video relative overflow-hidden rounded-lg">
          <Image
            src={product.images[0]?.secure_url || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
          />
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-2xl mb-4">{product.name}</CardTitle>
        <p className="text-muted-foreground">{product.description}</p>
        <p className="text-sm text-muted-foreground mt-2">Category: {product.category.name}</p>
      </CardContent>
      <CardFooter>
        <p className="text-2xl font-bold">৳{parseInt(product.price).toLocaleString()}</p>
      </CardFooter>
    </Card>
  )
}

