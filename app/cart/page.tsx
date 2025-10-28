"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Leaf, Trash2, Plus, Minus, ArrowLeft } from "lucide-react"
import { useCart } from "@/lib/cart-context"

export default function CartPage() {
  const router = useRouter()
  const { items, removeItem, updateQuantity, getTotalPrice } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-foreground">Meal Share</span>
            </Link>
          </div>
        </nav>

        {/* Empty Cart */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Start claiming food items from the marketplace!</p>
          <Link href="/marketplace">
            <Button className="bg-primary hover:bg-primary/90">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Marketplace
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const totalPrice = getTotalPrice()

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Meal Share</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/marketplace">
              <Button variant="ghost">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Your Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="p-6 border border-border">
                <div className="flex gap-6">
                  {/* Image */}
                  <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{item.location}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-foreground">₹{item.price.toFixed(2)}</span>
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{item.originalPrice.toFixed(2)}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 bg-muted rounded-lg p-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-background rounded"
                        >
                          <Minus className="w-4 h-4 text-foreground" />
                        </button>
                        <span className="w-8 text-center font-semibold text-foreground">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-background rounded"
                        >
                          <Plus className="w-4 h-4 text-foreground" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 hover:bg-muted rounded-lg text-destructive"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 border border-border sticky top-24 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">Order Summary</h2>

                <div className="space-y-3 border-b border-border pb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground font-medium">₹{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Pickup Fee</span>
                    <span className="text-foreground font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="text-foreground font-medium">₹{(totalPrice * 0.08).toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-primary">₹{(totalPrice * 1.08).toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => router.push("/checkout")}
                  className="w-full bg-primary hover:bg-primary/90 h-12 text-base"
                >
                  Proceed to Checkout
                </Button>
                <Link href="/marketplace" className="block">
                  <Button variant="outline" className="w-full bg-transparent">
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <p className="text-sm text-foreground">
                  <span className="font-semibold">💚 You're saving</span> ₹
                  {items
                    .reduce((total, item) => total + (item.originalPrice - item.price) * item.quantity, 0)
                    .toFixed(2)}{" "}
                  by using Meal Share!
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
