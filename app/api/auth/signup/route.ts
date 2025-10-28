import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name, role } = body

    // Get all registered users from a mock database (in real app, this would be from actual database)
    const registeredUsers = JSON.parse(localStorage?.getItem?.("registered-users") || "[]")

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

    // Store the new user in registered users list
    registeredUsers.push(newUser)

    // Note: In a real app, this would be stored in a database
    // For now, we're using a mock approach

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
