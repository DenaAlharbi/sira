// src/utils/validators.js

// --- 1. INSTANT REGEX VALIDATORS (Fast) ---

// Email: Checks for name@domain.com and blocks disposable emails
const DISPOSABLE_DOMAINS = ['mailinator.com', '10minutemail.com', 'temp-mail.org', 'yopmail.com'];
export const validateEmail = (email) => {
  if (!email) return { isValid: true };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return { isValid: false, error: "Invalid email format." };
  
  const domain = email.split('@')[1]?.toLowerCase();
  if (domain && DISPOSABLE_DOMAINS.includes(domain)) return { isValid: false, error: "Disposable emails not allowed." };
  
  return { isValid: true };
};

// Phone: Allows +, -, space, (). Must be 7-15 digits.
export const validatePhone = (phone) => {
  if (!phone) return { isValid: true };
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  if (!phoneRegex.test(phone)) return { isValid: false, error: "Invalid phone number." };
  return { isValid: true };
};

// URLs: Checks if the input is a valid URL and matches the specific platform domain
export const validateUrl = (url, platform) => {
  if (!url) return { isValid: true };
  
  // Basic URL structure check
  const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  if (!urlRegex.test(url)) return { isValid: false, error: "Invalid URL format." };

  // Platform-specific domain checks
  const lowerUrl = url.toLowerCase();
  switch (platform) {
    case 'LinkedIn':
      if (!lowerUrl.includes('linkedin.com')) return { isValid: false, error: "Must be a LinkedIn URL." };
      break;
    case 'Twitter / X':
      if (!lowerUrl.includes('twitter.com') && !lowerUrl.includes('x.com')) return { isValid: false, error: "Must be a Twitter or X URL." };
      break;
    case 'Instagram':
      if (!lowerUrl.includes('instagram.com')) return { isValid: false, error: "Must be an Instagram URL." };
      break;
    case 'Behance':
      if (!lowerUrl.includes('behance.net')) return { isValid: false, error: "Must be a Behance URL." };
      break;
    case 'GitHub': // Basic format check before API
       // We accept both full URLs and usernames for GitHub, but if it's a URL, check domain
       if (url.includes('http') && !lowerUrl.includes('github.com')) return { isValid: false, error: "Must be a GitHub URL." };
       break;
  }
  
  return { isValid: true };
};

// --- 2. ASYNC VALIDATOR (GitHub API) ---
// Returns a Promise. Call this only onBlur or Debounce.
export const verifyGithubUser = async (input) => {
  if (!input) return { isValid: true };

  // Extract username if they pasted a full URL
  let username = input;
  if (input.includes('github.com/')) {
    username = input.split('github.com/')[1].split('/')[0];
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (response.status === 404) return { isValid: false, error: "GitHub user not found." };
    if (response.status === 200) return { isValid: true };
    // If rate limited (403), ignore and assume valid to not block user
    return { isValid: true }; 
  } catch (err) {
    return { isValid: true }; // Fallback on network error
  }
};