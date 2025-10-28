import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for registered users (in production, use a real database)
const registeredUsers: any[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name, role } = body

    // Check if user already exists
    const userExists = registeredUsers.some((user: any) => user.email === email)

    if (userExists) {
      return NextResponse.json(
        {
          success: false,
          error: "You have account already created please login",
          accountExists: true,
        },
        { status: 400 },
      )
    }

    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      role,
      createdAt: new Date(),
    }

    // Store the new user in memory
    registeredUsers.push(newUser)

    return NextResponse.json(
      {
        success: true,
        data: newUser,
        token: "mock-jwt-token-" + newUser.id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error signing up:", error)
    return NextResponse.json({ success: false, error: "Failed to signup" }, { status: 500 })
  }
}
