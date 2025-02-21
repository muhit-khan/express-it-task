"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"
import Image from "next/image"
import { Loader2 } from "lucide-react"
import { setProducts as setStorageProducts } from "@/lib/storage"
import { createSlug } from "@/lib/utils"

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
        const response = await axios.get("/api/products")
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
    <div className="flex flex-wrap gap-4 p-4">
      {products.map((product) => (
        <Link href={`/products/${createSlug(product.name)}`} key={product._id} className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)]">
          <Card className="h-full backdrop-blur-md bg-white/15 border-white/20 hover:bg-white/20 transition-all duration-200 group">
            <CardHeader className="pb-2">
              <div className="aspect-[4/3] relative overflow-hidden rounded-xl group-hover:scale-105 transition-transform duration-200">
                <Image
                  src={product.images[0]?.secure_url || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <CardTitle className="line-clamp-2 text-white text-lg">{product.name}</CardTitle>
              <p className="text-sm text-white/70 mt-1 line-clamp-2">{product.description}</p>
            </CardContent>
            <CardFooter>
              <p className="font-semibold text-white">৳{parseInt(product.price).toLocaleString()}</p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}

