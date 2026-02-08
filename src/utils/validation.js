export const validatePhone = (phone) => {
  if (!phone || !phone.trim()) {
    return "Phone is required"
  }

  const cleaned = phone.trim()
  const digitsOnly = cleaned.replace(/\D/g, "")
  
  if (cleaned.startsWith("+")) {
    if (digitsOnly.length < 7) {
      return "Phone number must be at least 7 digits"
    }
    if (digitsOnly.length > 13) {
      return "Phone number cannot exceed 13 digits (international format)"
    }
    if (!/^\+[1-9]\d{6,14}$/.test(cleaned.replace(/[\s()-]/g, ""))) {
      return "Invalid international phone format. Use + followed by country code and number"
    }
  } else {
    if (digitsOnly.length < 7) {
      return "Phone number must be at least 7 digits"
    }
    if (digitsOnly.length > 15) {
      return "Phone number cannot exceed 15 digits"
    }
    if (!/^[1-9]\d{6,14}$/.test(digitsOnly)) {
      return "Invalid phone number format"
    }
  }

  return true
}

export const validateName = (name) => {
  if (!name || !name.trim()) {
    return "Name is required"
  }
  if (name.trim().length < 2) {
    return "Name must be at least 2 characters"
  }
  if (name.trim().length > 100) {
    return "Name cannot exceed 100 characters"
  }
  if (!/^[a-zA-Z\s'-]+$/.test(name.trim())) {
    return "Name can only contain letters, spaces, hyphens, and apostrophes"
  }
  return true
}

export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return "Email is required"
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.trim())) {
    return "Invalid email format"
  }
  if (email.trim().length > 255) {
    return "Email cannot exceed 255 characters"
  }
  return true
}
