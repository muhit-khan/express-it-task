"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"
import { Loader2 } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Product {
  _id: string
  name: string
  price: number
  description: string
  image: string
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://glore-bd-backend-node-mongo.vercel.app/api/product")
        setProducts(response.data)
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="line-clamp-2">{product.name}</CardTitle>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{product.description}</p>
            </CardContent>
            <CardFooter>
              <p className="font-semibold">৳{product.price.toLocaleString()}</p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}

