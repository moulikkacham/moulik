"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Leaf, Users, TrendingDown } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">Meal Share</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-primary hover:bg-primary/90">Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-6">
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground text-balance">Save Food, Help Communities</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Connect surplus food from restaurants, bakeries, and households with people who need it. Reduce waste while
            building stronger communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/marketplace">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Browse Available Food
              </Button>
            </Link>
            <Link href="/signup?role=uploader">
              <Button size="lg" variant="outline">
                Share Surplus Food
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-card border-y border-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 border border-border">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Upload Surplus</h3>
              <p className="text-muted-foreground">
                Restaurants, bakeries, and households list surplus food with photos, prices, and expiry dates.
              </p>
            </Card>

            <Card className="p-6 border border-border">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 mb-4">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Browse & Claim</h3>
              <p className="text-muted-foreground">
                Browse available food in your area and claim items you need. Simple, transparent, and community-driven.
              </p>
            </Card>

            <Card className="p-6 border border-border">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary/10 mb-4">
                <TrendingDown className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Reduce Waste</h3>
              <p className="text-muted-foreground">
                Track your impact as food is rescued from landfills and delivered to those who need it most.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-12 text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Ready to Make a Difference?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of people and organizations working together to reduce food waste and support our
            communities.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; 2025 Meal Share. Reducing waste, building community.</p>
        </div>
      </footer>
    </div>
  )
}
