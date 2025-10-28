import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get("userId")
    const status = searchParams.get("status")

    // TODO: Fetch claims from database
    const claims = [
      {
        id: 1,
        listingId: 1,
        buyerId: 123,
        status: "pending",
        claimedAt: new Date(),
      },
    ]

    return NextResponse.json({ success: true, data: claims })
  } catch (error) {
    console.error("Error fetching claims:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch claims" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { listingId, buyerId } = body

    // TODO: Create claim in database
    const newClaim = {
      id: Math.random(),
      listingId,
      buyerId,
      status: "pending",
      claimedAt: new Date(),
    }

    return NextResponse.json({ success: true, data: newClaim }, { status: 201 })
  } catch (error) {
    console.error("Error creating claim:", error)
    return NextResponse.json({ success: false, error: "Failed to create claim" }, { status: 500 })
  }
}
