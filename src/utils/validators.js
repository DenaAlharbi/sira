// --- 1. INSTANT REGEX VALIDATORS ---

const DISPOSABLE_DOMAINS = ['mailinator.com', '10minutemail.com', 'temp-mail.org', 'yopmail.com'];

export const validateEmail = (email) => {
  if (!email) return { isValid: true };
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(String(email).toLowerCase())) {
    return { isValid: false, error: "Please enter a valid email address." };
  }
  
  const domain = email.split('@')[1]?.toLowerCase();
  if (domain && DISPOSABLE_DOMAINS.includes(domain)) {
    return { isValid: false, error: "Disposable emails not allowed." };
  }
  
  return { isValid: true };
};

export const validatePhone = (phone) => {
  if (!phone) return { isValid: true };
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,}$/;
  if (!phoneRegex.test(String(phone))) {
    return { isValid: false, error: "Please enter a valid phone number." };
  }
  return { isValid: true };
};

// --- URL & HANDLE VALIDATOR (The Fix) ---
export const validateUrl = (input, platform) => {
  if (!input || input.trim() === '') return { isValid: true };
  
  const lowerInput = input.toLowerCase();
  
  // 1. Check if it LOOKS like a URL (starts with http, https, or www)
  const isUrl = /^(https?:\/\/|www\.)/i.test(input);

  // 2. If it is NOT a URL, we check if handles are allowed
  if (!isUrl) {
    const platformsAllowingHandles = ['GitHub', 'Twitter / X', 'Instagram', 'Behance'];
    
    if (platformsAllowingHandles.includes(platform)) {
      // It's a handle (e.g. @username or just username). 
      // Basic check: at least 2 chars, no spaces.
      if (input.length > 1 && !/\s/.test(input)) {
        return { isValid: true }; // Valid Handle!
      }
      return { isValid: false, error: `Invalid ${platform} username.` };
    }
    
    // If platform is LinkedIn or Website, we REQUIRE a full URL
    if (platform === 'LinkedIn' || platform === 'Website') {
       return { isValid: false, error: "Please enter a full URL (e.g. https://...)" };
    }
    
    // Fallback
    return { isValid: false, error: "Invalid format." };
  }

  // 3. If it IS a URL, check the syntax and domains
  const urlRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/i;

  if (!urlRegex.test(input)) {
    return { isValid: false, error: "Invalid URL format." };
  }

  // Domain Checks
  switch (platform) {
    case 'Twitter / X':
      if (!lowerInput.includes('twitter.com') && !lowerInput.includes('x.com')) {
        return { isValid: false, error: "Link must be from Twitter or X." };
      }
      break;

    case 'LinkedIn':
      if (!lowerInput.includes('linkedin.com')) {
        return { isValid: false, error: "Link must be from LinkedIn." };
      }
      break;

    case 'Instagram':
      if (!lowerInput.includes('instagram.com')) {
        return { isValid: false, error: "Link must be from Instagram." };
      }
      break;

    case 'Behance':
      if (!lowerInput.includes('behance.net')) {
        return { isValid: false, error: "Link must be from Behance." };
      }
      break;

    case 'GitHub':
      if (!lowerInput.includes('github.com')) {
        return { isValid: false, error: "Link must be from GitHub." };
      }
      break;
  }
  
  return { isValid: true };
};

// --- ASYNC GITHUB CHECK ---
export const verifyGithubUser = async (input) => {
  if (!input) return { isValid: true };

  let username = input;
  
  // Logic: Is it a URL or Handle?
  if (input.includes('github.com/')) {
    const parts = input.split('github.com/');
    if (parts[1]) username = parts[1].split('/')[0];
  } else {
    // Clean handle (remove @ if present)
    username = input.replace(/^@/, '');
  }
  
  username = username.replace(/\/$/, ""); // Remove trailing slash

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (response.status === 404) return { isValid: false, error: "GitHub user not found." };
    if (response.ok) return { isValid: true };
    return { isValid: true }; 
  } catch (err) {
    return { isValid: true }; 
  }
};