import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import StickyBanner from "@/components/sticky-banner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Express IT BD - Store Creation",
  description: "Create your store and manage products",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <StickyBanner />
      </body>
    </html>
  )
}