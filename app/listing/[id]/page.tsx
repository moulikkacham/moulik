"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Leaf, MapPin, Clock, Star, MessageCircle } from "lucide-react"
import { useCart } from "@/lib/cart-context"

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { addItem } = useCart()

  // Mock data - replace with real data from API
  const listing = {
    id: Number.parseInt(params.id),
    title: "Fresh Bagels & Pastries",
    description:
      "Assorted fresh bagels and pastries from this morning. Includes plain, everything, sesame, and poppy seed varieties.",
    price: 45,
    originalPrice: 89,
    location: "Downtown Bakery",
    distance: "0.5 km",
    expiresIn: "2 hours",
    image: "/fresh-bagels-and-pastries.jpg",
    category: "Bakery",
    rating: 4.8,
    reviews: 24,
    uploader: {
      name: "Downtown Bakery",
      rating: 4.7,
      reviews: 156,
      avatar: "/bakery-avatar.jpg",
    },
    details: {
      quantity: "12 items",
      allergens: "Contains gluten, sesame",
      storage: "Room temperature",
      pickup: "Today until 6 PM",
    },
  }

  const handleClaim = () => {
    addItem({
      id: listing.id,
      title: listing.title,
      price: listing.price,
      originalPrice: listing.originalPrice,
      image: listing.image,
      location: listing.location,
      quantity: 1,
      uploaderId: 1,
      uploaderName: listing.uploader.name,
    })
    router.push("/cart")
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
          <div className="flex items-center gap-4">
            <Link href="/marketplace">
              <Button variant="ghost">Back to Marketplace</Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost">Profile</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Image */}
          <div className="md:col-span-2">
            <div className="relative h-96 bg-muted rounded-lg overflow-hidden mb-6">
              <img
                src={listing.image || "/placeholder.svg"}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full font-medium">
                {Math.round((1 - listing.price / listing.originalPrice) * 100)}% off
              </div>
            </div>

            {/* Details */}
            <Card className="p-6 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Quantity</p>
                  <p className="font-semibold text-foreground">{listing.details.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Storage</p>
                  <p className="font-semibold text-foreground">{listing.details.storage}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Allergens</p>
                  <p className="font-semibold text-foreground">{listing.details.allergens}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pickup</p>
                  <p className="font-semibold text-foreground">{listing.details.pickup}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <Card className="p-6 border border-border">
              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground text-sm mb-2">Price</p>
                  <div className="flex items-center gap-2">
                    <span className="text-4xl font-bold text-foreground">₹{listing.price}</span>
                    <span className="text-lg text-muted-foreground line-through">₹{listing.originalPrice}</span>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground border-t border-border pt-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {listing.location} • {listing.distance}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Expires in {listing.expiresIn}</span>
                  </div>
                </div>

                <Button onClick={handleClaim} className="w-full bg-primary hover:bg-primary/90 h-12 text-base">
                  Claim This Item
                </Button>
              </div>
            </Card>

            {/* Uploader Card */}
            <Card className="p-6 border border-border">
              <h3 className="font-semibold text-foreground mb-4">Seller</h3>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={listing.uploader.avatar || "/placeholder.svg"}
                  alt={listing.uploader.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-foreground">{listing.uploader.name}</p>
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(listing.uploader.rating) ? "fill-accent text-accent" : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">({listing.uploader.reviews})</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <MessageCircle className="w-4 h-4" />
                Contact Seller
              </Button>
            </Card>

            {/* Rating Card */}
            <Card className="p-6 border border-border">
              <h3 className="font-semibold text-foreground mb-4">Rating</h3>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(listing.rating) ? "fill-accent text-accent" : "text-muted"}`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-foreground">{listing.rating}</span>
              </div>
              <p className="text-sm text-muted-foreground">Based on {listing.reviews} reviews</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
