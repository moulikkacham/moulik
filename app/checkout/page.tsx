"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Leaf, CheckCircle, MapPin, Clock, CreditCard } from "lucide-react"
import { useCart } from "@/lib/cart-context"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderDetails, setOrderDetails] = useState<{
    items: typeof items
    total: number
    tax: number
  } | null>(null)

  const EXCHANGE_RATE = 83

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <nav className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-foreground">Meal Share</span>
            </Link>
          </div>
        </nav>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="text-muted-foreground mb-8">Your cart is empty. Please add items before checking out.</p>
          <Link href="/marketplace">
            <Button className="bg-primary hover:bg-primary/90">Back to Marketplace</Button>
          </Link>
        </div>
      </div>
    )
  }

  const totalPrice = getTotalPrice()
  const totalPriceINR = totalPrice * EXCHANGE_RATE
  const taxAmountINR = totalPriceINR * 0.08
  const finalTotalINR = totalPriceINR + taxAmountINR

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    setOrderDetails({
      items: items,
      total: totalPrice,
      tax: totalPrice * 0.08,
    })
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setOrderPlaced(true)
    clearCart()
  }

  if (orderPlaced) {
    const displayItems = orderDetails?.items || []
    const displayTotal = orderDetails?.total || 0
    const displayTax = orderDetails?.tax || 0
    const displayTotalINR = displayTotal * EXCHANGE_RATE
    const displayTaxINR = displayTax * EXCHANGE_RATE
    const displayFinalTotalINR = displayTotalINR + displayTaxINR

    return (
      <div className="min-h-screen bg-background">
        <nav className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-foreground">Meal Share</span>
            </Link>
          </div>
        </nav>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <CheckCircle className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-8">
              Thank you for your order. Your food items are ready for pickup.
            </p>
          </div>

          <Card className="p-8 border border-border mb-8 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">Order Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order ID</span>
                  <span className="font-semibold text-foreground">
                    #MS{Math.random().toString(36).substr(2, 9).toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Items Ordered</span>
                  <span className="font-semibold text-foreground">
                    {displayItems.length} item{displayItems.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              <div className="border-t border-border mt-4 pt-4">
                <h3 className="font-semibold text-foreground mb-3">Items in Your Order</h3>
                <div className="space-y-2">
                  {displayItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.title} x{item.quantity}
                      </span>
                      <span className="font-medium text-foreground">
                        ₹{(item.price * item.quantity * EXCHANGE_RATE).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">₹{displayTotalINR.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span className="font-medium text-foreground">₹{displayTaxINR.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="font-bold text-foreground">Total Amount</span>
                  <span className="text-2xl font-bold text-primary">₹{displayFinalTotalINR.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-6 space-y-4">
              <h3 className="font-bold text-foreground">Pickup Instructions</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Pickup Time</p>
                    <p className="text-sm text-muted-foreground">Today between 4:00 PM - 6:00 PM</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Pickup Location</p>
                    <p className="text-sm text-muted-foreground">
                      Check your email for specific pickup details from each seller
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-3">
            <Link href="/marketplace" className="block">
              <Button className="w-full bg-primary hover:bg-primary/90 h-12">Continue Shopping</Button>
            </Link>
            <Link href="/profile" className="block">
              <Button variant="outline" className="w-full bg-transparent">
                View My Orders
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <Card className="p-6 border border-border">
              <h2 className="text-lg font-bold text-foreground mb-4">Delivery Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                  <input
                    type="text"
                    placeholder="123 Main Street"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">City</label>
                    <input
                      type="text"
                      placeholder="New York"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">ZIP Code</label>
                    <input
                      type="text"
                      placeholder="10001"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Payment Method */}
            <Card className="p-6 border border-border">
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Method
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 border border-border sticky top-24 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-foreground mb-4">Order Summary</h2>

                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.title} x{item.quantity}
                      </span>
                      <span className="text-foreground font-medium">
                        ₹{(item.price * item.quantity * EXCHANGE_RATE).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground font-medium">₹{totalPriceINR.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span className="text-foreground font-medium">₹{taxAmountINR.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-border">
                    <span className="font-bold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-primary">₹{finalTotalINR.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full bg-primary hover:bg-primary/90 h-12 text-base"
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </Button>

              <Link href="/cart" className="block">
                <Button variant="outline" className="w-full bg-transparent">
                  Back to Cart
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
