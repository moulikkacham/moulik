import { type NextRequest, NextResponse } from "next/server"

// Mock database - replace with real database calls
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
    price: 2.99,
    originalPrice: 8.99,
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

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    // TODO: Replace with real database query
    let results = mockListings

    if (category) {
      results = results.filter((l) => l.category === category)
    }

    if (search) {
      results = results.filter(
        (l) =>
          l.title.toLowerCase().includes(search.toLowerCase()) ||
          l.description.toLowerCase().includes(search.toLowerCase()),
      )
    }

    return NextResponse.json({ success: true, data: results })
  } catch (error) {
    console.error("Error fetching listings:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch listings" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // TODO: Validate input and create listing in database
    const newListing = {
      id: Math.random(),
      ...body,
      createdAt: new Date(),
    }

    return NextResponse.json({ success: true, data: newListing }, { status: 201 })
  } catch (error) {
    console.error("Error creating listing:", error)
    return NextResponse.json({ success: false, error: "Failed to create listing" }, { status: 500 })
  }
}
