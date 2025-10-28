"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Leaf, Plus, TrendingUp, Users, Eye, Trash2, Edit2, CheckCircle, Clock } from "lucide-react"
import { useUploads } from "@/lib/uploads-context"

export default function DashboardPage() {
  const { listings, removeListing } = useUploads()

  const stats = {
    totalShared: listings.length,
    peopleHelped: listings.reduce((sum, l) => sum + l.claims * 5, 0),
    wastePrevented: listings.reduce((sum, l) => sum + l.views * 0.5, 0),
    activeListings: listings.filter((l) => l.status === "active").length,
  }

  const handleDelete = (id: number) => {
    removeListing(id)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "claimed":
        return "bg-blue-100 text-blue-800"
      case "expired":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock className="w-4 h-4" />
      case "claimed":
        return <CheckCircle className="w-4 h-4" />
      default:
        return null
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
            <Link href="/profile">
              <Button variant="ghost">Profile</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Your Dashboard</h1>
              <p className="text-muted-foreground">Manage your food listings and track your impact</p>
            </div>
            <Link href="/dashboard/upload">
              <Button className="bg-primary hover:bg-primary/90 gap-2">
                <Plus className="w-4 h-4" />
                Upload Food
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Food Shared</p>
                  <p className="text-3xl font-bold text-foreground">{stats.totalShared}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </Card>

            <Card className="p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">People Helped</p>
                  <p className="text-3xl font-bold text-foreground">{Math.floor(stats.peopleHelped)}</p>
                </div>
                <Users className="w-8 h-8 text-accent" />
              </div>
            </Card>

            <Card className="p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Waste Prevented</p>
                  <p className="text-3xl font-bold text-foreground">{Math.floor(stats.wastePrevented)} kg</p>
                </div>
                <Leaf className="w-8 h-8 text-secondary" />
              </div>
            </Card>

            <Card className="p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Active Listings</p>
                  <p className="text-3xl font-bold text-foreground">{stats.activeListings}</p>
                </div>
                <Eye className="w-8 h-8 text-primary" />
              </div>
            </Card>
          </div>

          {/* Listings Table */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Your Listings</h2>
            {listings.length === 0 ? (
              <Card className="p-8 border border-border text-center">
                <p className="text-muted-foreground mb-4">No listings yet. Start by uploading your first food item!</p>
                <Link href="/dashboard/upload">
                  <Button className="bg-primary hover:bg-primary/90">Upload Food</Button>
                </Link>
              </Card>
            ) : (
              <Card className="border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted border-b border-border">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Food Item</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Price</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Views</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Claims</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Expires</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listings.map((listing) => (
                        <tr key={listing.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                          <td className="px-6 py-4">
                            <p className="font-medium text-foreground">{listing.title}</p>
                            <p className="text-sm text-muted-foreground">{listing.createdAt}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-semibold text-foreground">${listing.price.toFixed(2)}</p>
                          </td>
                          <td className="px-6 py-4">
                            <div
                              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                listing.status,
                              )}`}
                            >
                              {getStatusIcon(listing.status)}
                              {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-foreground">{listing.views}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-foreground font-medium">{listing.claims}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-muted-foreground">{listing.expiresAt}</p>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                                <Edit2 className="w-4 h-4 text-primary" />
                              </button>
                              <button
                                onClick={() => handleDelete(listing.id)}
                                className="p-2 hover:bg-muted rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {listings.length === 0 ? (
                <Card className="p-4 border border-border">
                  <p className="text-muted-foreground">No activity yet. Upload your first food item to get started!</p>
                </Card>
              ) : (
                listings.slice(0, 3).map((listing) => (
                  <Card key={listing.id} className="p-4 border border-border">
                    <p className="text-foreground">You uploaded {listing.title}</p>
                    <p className="text-sm text-muted-foreground">{listing.createdAt}</p>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
