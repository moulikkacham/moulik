"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface UploadedListing {
  id: number
  title: string
  price: number
  category: string
  description: string
  image: string
  location: string
  expiresAt: string
  status: "active" | "claimed" | "expired"
  views: number
  claims: number
  createdAt: string
}

interface UploadsContextType {
  listings: UploadedListing[]
  addListing: (listing: UploadedListing) => void
  removeListing: (id: number) => void
  updateListing: (id: number, listing: Partial<UploadedListing>) => void
}

const UploadsContext = createContext<UploadsContextType | undefined>(undefined)

export function UploadsProvider({ children }: { children: React.ReactNode }) {
  const [listings, setListings] = useState<UploadedListing[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load listings from localStorage on mount
  useEffect(() => {
    const savedListings = localStorage.getItem("meal-share-uploads")
    if (savedListings) {
      try {
        setListings(JSON.parse(savedListings))
      } catch (error) {
        console.error("Failed to load listings:", error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save listings to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("meal-share-uploads", JSON.stringify(listings))
    }
  }, [listings, isLoaded])

  const addListing = (newListing: UploadedListing) => {
    setListings((prevListings) => [newListing, ...prevListings])
  }

  const removeListing = (id: number) => {
    setListings((prevListings) => prevListings.filter((listing) => listing.id !== id))
  }

  const updateListing = (id: number, updatedData: Partial<UploadedListing>) => {
    setListings((prevListings) =>
      prevListings.map((listing) => (listing.id === id ? { ...listing, ...updatedData } : listing)),
    )
  }

  return (
    <UploadsContext.Provider value={{ listings, addListing, removeListing, updateListing }}>
      {children}
    </UploadsContext.Provider>
  )
}

export function useUploads() {
  const context = useContext(UploadsContext)
  if (context === undefined) {
    throw new Error("useUploads must be used within an UploadsProvider")
  }
  return context
}
