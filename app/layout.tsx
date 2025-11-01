import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/lib/cart-context"
import { UploadsProvider } from "@/lib/uploads-context"
import { LocationProvider } from "@/lib/location-context"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Meal Share - Save Food, Help Communities",
  description: "Connect surplus food with people who need it. Reduce waste, build community.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <LocationProvider>
          <UploadsProvider>
            <CartProvider>{children}</CartProvider>
          </UploadsProvider>
        </LocationProvider>
        <Analytics />
      </body>
    </html>
  )
}
