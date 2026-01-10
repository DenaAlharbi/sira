// 1. A list of common disposable email domains to block
const DISPOSABLE_DOMAINS = [
  'mailinator.com', '10minutemail.com', 'temp-mail.org', 'guerrillamail.com', 
  'sharklasers.com', 'yopmail.com', 'getnada.com'
];

export const validateEmail = (email) => {
  if (!email) return { isValid: true }; // Allow empty if not required

  // 1. Basic Regex Check (Checks for name@domain.extension)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Please enter a valid email address." };
  }

  // 2. Disposable Domain Check
  const domain = email.split('@')[1].toLowerCase();
  if (DISPOSABLE_DOMAINS.includes(domain)) {
    return { isValid: false, error: "Temporary/Disposable emails are not allowed." };
  }

  return { isValid: true };
};