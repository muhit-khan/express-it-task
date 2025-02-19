"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"
import Image from "next/image"
import { Loader2 } from "lucide-react"
import { setProducts as setStorageProducts } from "@/lib/storage"

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

export default function ProductGrid() {
  const [products, setProductsState] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://glore-bd-backend-node-mongo.vercel.app/api/product")
        if (Array.isArray(response.data.data)) {
          setStorageProducts(response.data.data) // Save to localStorage
          setProductsState(response.data.data)
        } else {
          setError("Invalid data format received")
          console.error("Invalid data format:", response.data)
        }
      } catch (err) {
        setError("Failed to load products")
        console.error("Error fetching products:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link href={`/products/${product._id}`} key={product._id}>
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="aspect-square relative overflow-hidden rounded-lg">
                <Image
                  src={product.images[0]?.secure_url || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="line-clamp-2">{product.name}</CardTitle>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{product.description}</p>
            </CardContent>
            <CardFooter>
              <p className="font-semibold">৳{parseInt(product.price).toLocaleString()}</p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}

