"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Leaf, Upload } from "lucide-react"
import { useUploads } from "@/lib/uploads-context"

export default function UploadFoodPage() {
  const router = useRouter()
  const { addListing } = useUploads()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Bakery",
    quantity: "",
    originalPrice: "",
    listingPrice: "",
    expiresAt: "",
    location: "",
    allergens: "",
    storage: "Room temperature",
  })

  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newListing = {
        id: Date.now(),
        title: formData.title,
        price: Number.parseFloat(formData.listingPrice),
        category: formData.category,
        description: formData.description,
        image: imagePreview || "/diverse-food-spread.png",
        location: formData.location,
        expiresAt: formData.expiresAt,
        status: "active" as const,
        views: 0,
        claims: 0,
        createdAt: new Date().toLocaleString(),
      }

      addListing(newListing)

      // Show success message
      setSuccessMessage("Food listing created successfully! Redirecting to dashboard...")

      // Redirect to dashboard after 1.5 seconds
      setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
    } catch (error) {
      console.error("Upload failed:", error)
      setLoading(false)
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
            <Link href="/dashboard">
              <Button variant="ghost">Back to Dashboard</Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost">Profile</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Upload Surplus Food</h1>
            <p className="text-muted-foreground">Share your surplus food with the community</p>
          </div>

          {successMessage && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-medium">{successMessage}</p>
            </div>
          )}

          <Card className="p-8 border border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Food Photo</label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-input"
                  />
                  <label htmlFor="image-input" className="cursor-pointer">
                    {imagePreview ? (
                      <div className="space-y-2">
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImage(null)
                            setImagePreview(null)
                          }}
                          className="text-sm text-destructive hover:underline"
                        >
                          Remove image
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                        <p className="text-foreground font-medium">Click to upload or drag and drop</p>
                        <p className="text-sm text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Food Title</label>
                  <Input
                    type="text"
                    name="title"
                    placeholder="e.g., Fresh Bagels & Pastries"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                  >
                    <option>Bakery</option>
                    <option>Produce</option>
                    <option>Ready-to-Eat</option>
                    <option>Dairy</option>
                    <option>Beverages</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                <textarea
                  name="description"
                  placeholder="Describe the food, ingredients, and any special details..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                  required
                />
              </div>

              {/* Quantity & Pricing */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Quantity</label>
                  <Input
                    type="text"
                    name="quantity"
                    placeholder="e.g., 12 items"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Original Price</label>
                  <Input
                    type="number"
                    name="originalPrice"
                    placeholder="0.00"
                    step="0.01"
                    value={formData.originalPrice}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Your Price</label>
                  <Input
                    type="number"
                    name="listingPrice"
                    placeholder="0.00"
                    step="0.01"
                    value={formData.listingPrice}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Location & Expiry */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Pickup Location</label>
                  <Input
                    type="text"
                    name="location"
                    placeholder="e.g., Downtown Bakery"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Expires At</label>
                  <Input
                    type="datetime-local"
                    name="expiresAt"
                    value={formData.expiresAt}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Storage & Allergens */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Storage</label>
                  <select
                    name="storage"
                    value={formData.storage}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                  >
                    <option>Room temperature</option>
                    <option>Refrigerated</option>
                    <option>Frozen</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Allergens</label>
                  <Input
                    type="text"
                    name="allergens"
                    placeholder="e.g., Contains gluten, sesame"
                    value={formData.allergens}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={loading} className="flex-1 bg-primary hover:bg-primary/90">
                  {loading ? "Uploading..." : "Upload Food"}
                </Button>
                <Link href="/dashboard" className="flex-1">
                  <Button type="button" variant="outline" className="w-full bg-transparent">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}
