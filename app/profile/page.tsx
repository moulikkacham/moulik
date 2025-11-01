"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Leaf, User, ShoppingBag, MapPin, Mail, Phone, LogOut } from "lucide-react"
import { useLocation } from "@/lib/location-context"

interface Order {
  id: string
  date: string
  items: Array<{
    title: string
    quantity: number
    price: number
  }>
  total: number
  status: "completed" | "pending" | "cancelled"
}

interface UserProfile {
  name: string
  email: string
  phone: string
  address: string
}

export default function ProfilePage() {
  const router = useRouter()
  const { userLocation, setUserLocation } = useLocation()
  const [isEditingLocation, setIsEditingLocation] = useState(false)
  const [locationInput, setLocationInput] = useState(userLocation)

  const [orders, setOrders] = useState<Order[]>([
    {
      id: "MS123ABC456",
      date: "Today at 2:30 PM",
      items: [
        { title: "Fresh Bagels & Pastries", quantity: 1, price: 45 },
        { title: "Organic Vegetables Mix", quantity: 2, price: 50 },
      ],
      total: 145,
      status: "completed",
    },
    {
      id: "MS789DEF012",
      date: "Yesterday at 5:15 PM",
      items: [
        { title: "Artisan Bread Loaves", quantity: 1, price: 40 },
        { title: "Fresh Juices", quantity: 3, price: 25 },
      ],
      total: 115,
      status: "completed",
    },
  ])

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, New York, NY 10001",
  })

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile")
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile))
    }
    setLocationInput(userLocation)
  }, [userLocation])

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userProfile")
    router.push("/login")
  }

  const handleEditProfile = () => {
    router.push("/profile/edit")
  }

  const handleSaveLocation = () => {
    if (locationInput.trim()) {
      setUserLocation(locationInput)
      setIsEditingLocation(false)
    }
  }

  const joinedDate = "March 15, 2024"
  const totalOrders = orders.length
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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
              <Button variant="ghost">Browse Food</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 border border-border space-y-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">{userProfile.name}</h1>
                <p className="text-sm text-muted-foreground">Member since {joinedDate}</p>
              </div>

              <div className="space-y-4 border-t border-border pt-6">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium text-foreground">{userProfile.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium text-foreground">{userProfile.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Address</p>
                    <p className="text-sm font-medium text-foreground">{userProfile.address}</p>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-muted-foreground">Search Location</p>
                    <button
                      onClick={() => setIsEditingLocation(!isEditingLocation)}
                      className="text-xs text-primary hover:underline"
                    >
                      {isEditingLocation ? "Cancel" : "Edit"}
                    </button>
                  </div>
                  {isEditingLocation ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={locationInput}
                        onChange={(e) => setLocationInput(e.target.value)}
                        placeholder="Enter your location (e.g., Downtown, Market Area)"
                        className="flex-1 px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground"
                      />
                      <Button onClick={handleSaveLocation} size="sm" className="bg-primary hover:bg-primary/90">
                        Save
                      </Button>
                    </div>
                  ) : (
                    <p className="text-sm font-medium text-foreground">{userLocation || "No location set"}</p>
                  )}
                </div>
              </div>

              <div className="space-y-3 border-t border-border pt-6">
                <Button
                  onClick={handleEditProfile}
                  variant="outline"
                  className="w-full bg-transparent hover:bg-primary/10"
                >
                  Edit Profile
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full bg-transparent hover:bg-red-50 text-red-600 hover:text-red-700 gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            </Card>

            {/* Stats */}
            <Card className="p-6 border border-border mt-6 space-y-4">
              <h3 className="font-bold text-foreground">Your Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Orders</span>
                  <span className="font-bold text-foreground">{totalOrders}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Spent</span>
                  <span className="font-bold text-foreground">₹{totalSpent}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Orders Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <ShoppingBag className="w-6 h-6" />
                Order History
              </h2>
              <p className="text-muted-foreground mt-1">View all your past orders and their details</p>
            </div>

            <div className="space-y-4">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <Card key={order.id} className="p-6 border border-border space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-foreground">Order #{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                      </div>
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          order.status,
                        )}`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </div>
                    </div>

                    <div className="border-t border-border pt-4">
                      <h4 className="font-semibold text-foreground mb-3">Items Ordered</h4>
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {item.title} x{item.quantity}
                            </span>
                            <span className="font-medium text-foreground">₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-border pt-4 flex justify-between items-center">
                      <span className="font-bold text-foreground">Total Amount</span>
                      <span className="text-2xl font-bold text-primary">₹{order.total}</span>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-8 border border-border text-center">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">No orders yet. Start shopping to see your orders here!</p>
                  <Link href="/marketplace" className="mt-4 inline-block">
                    <Button className="bg-primary hover:bg-primary/90">Browse Food</Button>
                  </Link>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
