"use client"

import Link from "next/link"
import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Leaf } from "lucide-react"
import { FoodListingCard } from "@/components/food-listing-card"
import { MarketplaceFilters } from "@/components/marketplace-filters"
import { useCart } from "@/lib/cart-context"

// Mock data - replace with real data from API
const mockListings = [
  {
    id: 1,
    title: "Fresh Bagels & Pastries",
    description: "Assorted fresh bagels and pastries from this morning",
    price: 45,
    originalPrice: 89,
    location: "Downtown Bakery",
    distance: "0.5 km",
    expiresIn: "2 hours",
    image: "/fresh-bagels-and-pastries.jpg",
    category: "Bakery",
    rating: 4.8,
    reviews: 24,
  },
  {
    id: 2,
    title: "Organic Vegetables Mix",
    description: "Mixed organic vegetables - carrots, broccoli, peppers",
    price: 50,
    originalPrice: 99,
    location: "Farmers Market",
    distance: "1.2 km",
    expiresIn: "4 hours",
    image: "/organic-vegetables-display.png",
    category: "Produce",
    rating: 4.6,
    reviews: 18,
  },
  {
    id: 3,
    title: "Prepared Salads",
    description: "Caesar and Greek salads, made fresh today",
    price: 55,
    originalPrice: 99,
    location: "Healthy Cafe",
    distance: "0.8 km",
    expiresIn: "3 hours",
    image: "/fresh-salads.jpg",
    category: "Ready-to-Eat",
    rating: 4.7,
    reviews: 31,
  },
  {
    id: 4,
    title: "Artisan Bread Loaves",
    description: "Whole wheat and sourdough loaves",
    price: 40,
    originalPrice: 79,
    location: "Local Bakery",
    distance: "1.5 km",
    expiresIn: "5 hours",
    image: "/artisan-bread-loaves.jpg",
    category: "Bakery",
    rating: 4.9,
    reviews: 42,
  },
  {
    id: 5,
    title: "Fruit Boxes",
    description: "Seasonal fruits - apples, oranges, bananas",
    price: 60,
    originalPrice: 99,
    location: "Produce Stand",
    distance: "0.3 km",
    expiresIn: "6 hours",
    image: "/fresh-fruit-box.jpg",
    category: "Produce",
    rating: 4.5,
    reviews: 15,
  },
  {
    id: 6,
    title: "Deli Sandwiches",
    description: "Turkey, ham, and veggie sandwiches",
    price: 65,
    originalPrice: 99,
    location: "Downtown Deli",
    distance: "0.7 km",
    expiresIn: "2 hours",
    image: "/deli-sandwiches.jpg",
    category: "Ready-to-Eat",
    rating: 4.4,
    reviews: 28,
  },
  {
    id: 7,
    title: "Fresh Milk & Dairy",
    description: "Milk, yogurt, and cheese products",
    price: 50,
    originalPrice: 89,
    location: "Local Market",
    distance: "1.1 km",
    expiresIn: "1 hour",
    image: "/fresh-milk-and-dairy-products.jpg",
    category: "Dairy",
    rating: 4.7,
    reviews: 19,
  },
  {
    id: 8,
    title: "Fresh Juices",
    description: "Orange, apple, and mixed fruit juices",
    price: 25,
    originalPrice: 49,
    location: "Juice Bar",
    distance: "0.9 km",
    expiresIn: "3 hours",
    image: "/fresh-fruit-juices.jpg",
    category: "Beverages",
    rating: 4.6,
    reviews: 22,
  },
  {
    id: 9,
    title: "Chicken Biryani",
    description: "Fragrant basmati rice with tender chicken, spices, and herbs",
    price: 95,
    originalPrice: 100,
    location: "Indian Restaurant",
    distance: "1.3 km",
    expiresIn: "2 hours",
    image: "/chicken-biryani.png",
    category: "Ready-to-Eat",
    rating: 4.9,
    reviews: 45,
  },
  {
    id: 10,
    title: "Vegetable Biryani",
    description: "Mixed vegetables with basmati rice and aromatic spices",
    price: 85,
    originalPrice: 99,
    location: "Indian Restaurant",
    distance: "1.3 km",
    expiresIn: "2 hours",
    image: "/vegetable-biryani.png",
    category: "Ready-to-Eat",
    rating: 4.8,
    reviews: 38,
  },
  {
    id: 11,
    title: "Samosas & Chutney",
    description: "Crispy samosas with mint and tamarind chutney",
    price: 35,
    originalPrice: 69,
    location: "Indian Snacks Shop",
    distance: "0.6 km",
    expiresIn: "3 hours",
    image: "/samosas-indian-snacks.jpg",
    category: "Ready-to-Eat",
    rating: 4.7,
    reviews: 52,
  },
  {
    id: 12,
    title: "Naan Bread",
    description: "Fresh baked naan bread - plain, garlic, and butter varieties",
    price: 20,
    originalPrice: 39,
    location: "Indian Bakery",
    distance: "0.9 km",
    expiresIn: "4 hours",
    image: "/naan-bread-indian.jpg",
    category: "Bakery",
    rating: 4.8,
    reviews: 41,
  },
  {
    id: 13,
    title: "Butter Chicken Curry",
    description: "Creamy tomato-based curry with tender chicken pieces",
    price: 100,
    originalPrice: 100,
    location: "Indian Restaurant",
    distance: "1.3 km",
    expiresIn: "2 hours",
    image: "/butter-chicken-curry.png",
    category: "Ready-to-Eat",
    rating: 4.9,
    reviews: 67,
  },
  {
    id: 14,
    title: "Paneer Tikka",
    description: "Marinated cottage cheese grilled with peppers and onions",
    price: 75,
    originalPrice: 99,
    location: "Indian Restaurant",
    distance: "1.3 km",
    expiresIn: "2 hours",
    image: "/paneer-tikka.png",
    category: "Ready-to-Eat",
    rating: 4.7,
    reviews: 33,
  },
  {
    id: 15,
    title: "Pizza Slices",
    description: "Pepperoni, margherita, and veggie pizza slices",
    price: 60,
    originalPrice: 99,
    location: "Pizza Place",
    distance: "0.4 km",
    expiresIn: "1 hour",
    image: "/pizza-slices.jpg",
    category: "Ready-to-Eat",
    rating: 4.6,
    reviews: 58,
  },
  {
    id: 16,
    title: "Pasta Dishes",
    description: "Spaghetti carbonara, penne arrabbiata, and fettuccine alfredo",
    price: 70,
    originalPrice: 99,
    location: "Italian Restaurant",
    distance: "1.1 km",
    expiresIn: "2 hours",
    image: "/assorted-pasta.png",
    category: "Ready-to-Eat",
    rating: 4.7,
    reviews: 44,
  },
  {
    id: 17,
    title: "Fried Rice",
    description: "Vegetable and egg fried rice with soy sauce",
    price: 55,
    originalPrice: 89,
    location: "Asian Restaurant",
    distance: "0.8 km",
    expiresIn: "2 hours",
    image: "/fried-rice.png",
    category: "Ready-to-Eat",
    rating: 4.5,
    reviews: 29,
  },
  {
    id: 18,
    title: "Donuts & Pastries",
    description: "Glazed, chocolate, and filled donuts fresh from the oven",
    price: 45,
    originalPrice: 79,
    location: "Donut Shop",
    distance: "0.5 km",
    expiresIn: "3 hours",
    image: "/donuts-pastries.jpg",
    category: "Bakery",
    rating: 4.8,
    reviews: 73,
  },
  {
    id: 19,
    title: "Grilled Chicken",
    description: "Marinated grilled chicken breast with herbs",
    price: 90,
    originalPrice: 100,
    location: "Grill House",
    distance: "1.4 km",
    expiresIn: "2 hours",
    image: "/grilled-chicken.png",
    category: "Ready-to-Eat",
    rating: 4.8,
    reviews: 36,
  },
  {
    id: 20,
    title: "Smoothie Bowls",
    description: "Acai and berry smoothie bowls with granola and fruit",
    price: 50,
    originalPrice: 89,
    location: "Smoothie Bar",
    distance: "0.7 km",
    expiresIn: "1 hour",
    image: "/vibrant-smoothie-bowl.png",
    category: "Beverages",
    rating: 4.7,
    reviews: 51,
  },
]

export default function MarketplacePage() {
  const router = useRouter()
  const { addItem } = useCart()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("newest")

  const filteredAndSortedListings = useMemo(() => {
    const filtered = mockListings.filter((listing) => {
      const matchesSearch =
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !selectedCategory || listing.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "distance":
        filtered.sort((a, b) => Number.parseFloat(a.distance) - Number.parseFloat(b.distance))
        break
      case "expiring-soon":
        filtered.sort((a, b) => {
          const timeA = Number.parseInt(a.expiresIn)
          const timeB = Number.parseInt(b.expiresIn)
          return timeA - timeB
        })
        break
      default:
        // newest - keep original order
        break
    }

    return filtered
  }, [searchTerm, selectedCategory, sortBy])

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Meal Share</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost">Profile</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-lg font-bold text-foreground mb-4">Filters</h2>
              <MarketplaceFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </div>
          </div>

          {/* Listings Grid */}
          <div className="lg:col-span-3">
            <div className="space-y-6 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Available Food</h1>
                <p className="text-muted-foreground">{filteredAndSortedListings.length} items available in your area</p>
              </div>
            </div>

            {filteredAndSortedListings.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredAndSortedListings.map((listing) => (
                  <FoodListingCard
                    key={listing.id}
                    {...listing}
                    onClaim={() => {
                      addItem({
                        id: listing.id,
                        title: listing.title,
                        price: listing.price,
                        originalPrice: listing.originalPrice,
                        image: listing.image,
                        location: listing.location,
                        quantity: 1,
                        uploaderId: 1,
                        uploaderName: "Seller",
                      })
                      router.push("/cart")
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No food items found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
