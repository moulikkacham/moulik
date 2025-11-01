"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface LocationContextType {
  userLocation: string
  setUserLocation: (location: string) => void
  userCoordinates: { lat: number; lng: number } | null
  setUserCoordinates: (coords: { lat: number; lng: number } | null) => void
}

const LocationContext = createContext<LocationContextType | undefined>(undefined)

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [userLocation, setUserLocation] = useState("")
  const [userCoordinates, setUserCoordinates] = useState<{ lat: number; lng: number } | null>(null)

  // Load location from localStorage on mount
  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation")
    const savedCoordinates = localStorage.getItem("userCoordinates")
    if (savedLocation) {
      setUserLocation(savedLocation)
    }
    if (savedCoordinates) {
      try {
        setUserCoordinates(JSON.parse(savedCoordinates))
      } catch (error) {
        console.error("Failed to load coordinates:", error)
      }
    }
  }, [])

  // Save location to localStorage whenever it changes
  useEffect(() => {
    if (userLocation) {
      localStorage.setItem("userLocation", userLocation)
    }
  }, [userLocation])

  useEffect(() => {
    if (userCoordinates) {
      localStorage.setItem("userCoordinates", JSON.stringify(userCoordinates))
    }
  }, [userCoordinates])

  return (
    <LocationContext.Provider value={{ userLocation, setUserLocation, userCoordinates, setUserCoordinates }}>
      {children}
    </LocationContext.Provider>
  )
}

export function useLocation() {
  const context = useContext(LocationContext)
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider")
  }
  return context
}
