// Authentication utilities
// TODO: Implement with Supabase or NextAuth.js

export async function hashPassword(password: string): Promise<string> {
  // TODO: Use bcrypt or similar
  return password
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  // TODO: Use bcrypt or similar
  return password === hash
}

export function generateToken(userId: number): string {
  // TODO: Generate JWT token
  return "mock-token"
}

export function verifyToken(token: string): number | null {
  // TODO: Verify JWT token
  return null
}

export async function getCurrentUser(request: Request): Promise<{ id: number; email: string } | null> {
  // TODO: Extract user from request (cookie or header)
  return null
}
