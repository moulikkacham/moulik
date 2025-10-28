"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, IndianRupee, Star } from "lucide-react"

interface FoodListingCardProps {
  id: number
  title: string
  description: string
  price: number
  originalPrice: number
  location: string
  distance: string
  expiresIn: string
  image: string
  category: string
  rating?: number
  reviews?: number
  onClaim?: () => void
}

export function FoodListingCard({
  id,
  title,
  description,
  price,
  originalPrice,
  location,
  distance,
  expiresIn,
  image,
  category,
  rating = 4.5,
  reviews = 12,
  onClaim,
}: FoodListingCardProps) {
  const discountPercent = Math.round((1 - price / originalPrice) * 100)

  return (
    <Card className="overflow-hidden border border-border hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-muted overflow-hidden">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
          {discountPercent}% off
        </div>
        <div className="absolute top-2 left-2 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
          {category}
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-foreground text-lg line-clamp-2">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.floor(rating) ? "fill-accent text-accent" : "text-muted"}`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>

        <div className="flex items-center gap-2">
          <IndianRupee className="w-4 h-4 text-primary" />
          <span className="font-bold text-lg text-foreground">₹{price}</span>
          <span className="text-sm text-muted-foreground line-through">₹{originalPrice}</span>
        </div>

        {/* Location & Time */}
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>
              {location} • {distance}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Expires in {expiresIn}</span>
          </div>
        </div>

        <Button onClick={onClaim} className="w-full bg-primary hover:bg-primary/90">
          Claim Item
        </Button>
      </div>
    </Card>
  )
}
