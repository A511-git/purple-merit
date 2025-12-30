// Form validation utilities

export const validateEmail = (email: string): string | null => {
  if (!email) return "Email is required"
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return "Invalid email format"
  return null
}

export const validatePassword = (password: string): string | null => {
  if (!password) return "Password is required"
  if (password.length < 8) return "Password must be at least 8 characters"
  if (!/[A-Z]/.test(password)) return "Password must contain an uppercase letter"
  if (!/[a-z]/.test(password)) return "Password must contain an lowercase letter"
  if (!/[0-9]/.test(password)) return "Password must contain a number"
  return null
}

export const validateFullName = (fullName: string): string | null => {
  if (!fullName) return "Full name is required"
  if (fullName.trim().length < 2) return "Full name must be at least 2 characters"
  return null
}

export const validatePasswordMatch = (password: string, confirmPassword: string): string | null => {
  if (password !== confirmPassword) return "Passwords do not match"
  return null
}
