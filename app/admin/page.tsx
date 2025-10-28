"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Leaf, Users, Package, AlertCircle, TrendingUp, BarChart3, Flag, CheckCircle } from "lucide-react"

interface User {
  id: number
  name: string
  email: string
  role: "buyer" | "uploader"
  joinedAt: string
  status: "active" | "inactive"
}

interface Report {
  id: number
  type: "inappropriate" | "fraud" | "spam"
  reportedBy: string
  reportedItem: string
  status: "pending" | "resolved"
  createdAt: string
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "uploader",
      joinedAt: "2 weeks ago",
      status: "active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "buyer",
      joinedAt: "1 week ago",
      status: "active",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "uploader",
      joinedAt: "3 days ago",
      status: "inactive",
    },
  ])

  const [reports, setReports] = useState<Report[]>([
    {
      id: 1,
      type: "inappropriate",
      reportedBy: "User123",
      reportedItem: "Fresh Bagels & Pastries",
      status: "pending",
      createdAt: "2 hours ago",
    },
    {
      id: 2,
      type: "spam",
      reportedBy: "User456",
      reportedItem: "Organic Vegetables Mix",
      status: "resolved",
      createdAt: "1 day ago",
    },
  ])

  const stats = {
    totalUsers: 1234,
    totalListings: 456,
    totalClaims: 2891,
    pendingReports: reports.filter((r) => r.status === "pending").length,
  }

  const handleResolveReport = (id: number) => {
    setReports(reports.map((r) => (r.id === id ? { ...r, status: "resolved" } : r)))
  }

  const handleDeactivateUser = (id: number) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, status: "inactive" } : u)))
  }

  const getReportTypeColor = (type: string) => {
    switch (type) {
      case "inappropriate":
        return "bg-red-100 text-red-800"
      case "fraud":
        return "bg-orange-100 text-orange-800"
      case "spam":
        return "bg-yellow-100 text-yellow-800"
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
            <span className="text-sm font-medium text-foreground">Admin Panel</span>
            <Button variant="ghost">Logout</Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage users, listings, and reports</p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Users</p>
                  <p className="text-3xl font-bold text-foreground">{stats.totalUsers}</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </Card>

            <Card className="p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Active Listings</p>
                  <p className="text-3xl font-bold text-foreground">{stats.totalListings}</p>
                </div>
                <Package className="w-8 h-8 text-accent" />
              </div>
            </Card>

            <Card className="p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Claims</p>
                  <p className="text-3xl font-bold text-foreground">{stats.totalClaims}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-secondary" />
              </div>
            </Card>

            <Card className="p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Pending Reports</p>
                  <p className="text-3xl font-bold text-foreground">{stats.pendingReports}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-destructive" />
              </div>
            </Card>
          </div>

          {/* Reports Section */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Flag className="w-6 h-6" />
              User Reports
            </h2>
            <Card className="border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted border-b border-border">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Type</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Reported By</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Item</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report) => (
                      <tr key={report.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="px-6 py-4">
                          <div
                            className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getReportTypeColor(report.type)}`}
                          >
                            {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-foreground">{report.reportedBy}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-foreground">{report.reportedItem}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                              report.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {report.status === "resolved" && <CheckCircle className="w-4 h-4" />}
                            {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-muted-foreground">{report.createdAt}</p>
                        </td>
                        <td className="px-6 py-4">
                          {report.status === "pending" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleResolveReport(report.id)}
                              className="bg-transparent"
                            >
                              Resolve
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Users Section */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Users className="w-6 h-6" />
              User Management
            </h2>
            <Card className="border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted border-b border-border">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Role</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Joined</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-medium text-foreground">{user.name}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-foreground">{user.email}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div
                            className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                              user.role === "uploader" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-muted-foreground">{user.joinedAt}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div
                            className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                              user.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {user.status === "active" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeactivateUser(user.id)}
                              className="bg-transparent text-destructive hover:text-destructive"
                            >
                              Deactivate
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Analytics Section */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <BarChart3 className="w-6 h-6" />
              Platform Analytics
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-4">Food Shared by Category</h3>
                <div className="space-y-3">
                  {[
                    { category: "Bakery", count: 156, percent: 34 },
                    { category: "Produce", count: 142, percent: 31 },
                    { category: "Ready-to-Eat", count: 98, percent: 21 },
                    { category: "Dairy", count: 60, percent: 14 },
                  ].map((item) => (
                    <div key={item.category}>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-foreground">{item.category}</p>
                        <p className="text-sm text-muted-foreground">{item.count}</p>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${item.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-4">User Growth</h3>
                <div className="space-y-3">
                  {[
                    { period: "This Week", users: 234, change: "+12%" },
                    { period: "Last Week", users: 209, change: "+8%" },
                    { period: "2 Weeks Ago", users: 193, change: "+15%" },
                    { period: "3 Weeks Ago", users: 168, change: "+5%" },
                  ].map((item) => (
                    <div key={item.period} className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">{item.period}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-muted-foreground">{item.users} users</p>
                        <p className="text-sm text-green-600 font-medium">{item.change}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
