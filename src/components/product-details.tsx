"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Product {
  _id: string
  name: string
  price: number
  description: string
  image: string
}

export default function ProductDetails({ id }: { id: string }) {
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://glore-bd-backend-node-mongo.vercel.app/api/product/${id}`)
        setProduct(response.data)
      } catch (err) {
        setError("Failed to load product details")
        console.error("Error fetching product:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.image || "/placeholder.svg"} alt={product.name} className="object-cover w-full h-full" />
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-2xl mb-4">{product.name}</CardTitle>
        <p className="text-muted-foreground">{product.description}</p>
      </CardContent>
      <CardFooter>
        <p className="text-2xl font-bold">৳{product.price.toLocaleString()}</p>
      </CardFooter>
    </Card>
  )
}

