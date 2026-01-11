import { supabase } from '../supabaseClient';

export const generateUniqueSlug = async (fullName, title) => {
  
  // --- 1. Helper: Clean String ---
  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-') // Replace symbols/spaces with dash
      .replace(/^-+|-+$/g, '');    // Remove leading/trailing dashes
  };

  const baseName = slugify(fullName); // "dena-alharbi"
  
  // Split name for advanced logic
  const parts = baseName.split('-');
  const first = parts[0];
  const last = parts.length > 1 ? parts[parts.length - 1] : '';
  
  // Shorten Title (e.g. "Software Engineer" -> "dev", "Designer" -> "des")
  let shortTitle = '';
  if (title) {
    const t = title.toLowerCase();
    if (t.includes('develop') || t.includes('engineer')) shortTitle = 'dev';
    else if (t.includes('design') || t.includes('artist')) shortTitle = 'des';
    else if (t.includes('manager') || t.includes('lead')) shortTitle = 'lead';
    else if (t.includes('architect')) shortTitle = 'arch';
    else shortTitle = 'pro';
  }

  // --- 2. Smart Candidate List (Priority Order) ---
  const candidates = [];

  // Strategy A: The Perfect Match
  candidates.push(baseName); // dena-alharbi

  // Strategy B: The Professional (Short Title)
  if (shortTitle) {
    candidates.push(`${baseName}-${shortTitle}`); // dena-alharbi-dev
  }

  // Strategy C: Initials (Short & Clean)
  if (last) {
    candidates.push(`${first[0]}-${last}`); // d-alharbi
    candidates.push(`${first}-${last[0]}`); // dena-a
  }

  // Strategy D: "Tech Style" (No Vowels)
  // This often finds unique names that look cool, e.g. "dn-alhrbi"
  const devowel = (str) => str.replace(/[aeiou]/g, '');
  const devoweledName = `${devowel(first)}-${last}`;
  if (devoweledName.length > 2 && devoweledName !== baseName) {
    candidates.push(devoweledName); // dn-alharbi
  }

  // Strategy E: KSA Context
  candidates.push(`${baseName}-sa`); // dena-alharbi-sa

  // --- 3. Check Candidates Loop ---
  for (const candidate of candidates) {
    const isFree = await checkSlugAvailability(candidate);
    if (isFree) return candidate;
  }

  // --- 4. Last Resort: Random 2-Char Suffix ---
  // We keep trying until we find a free one.
  let isUnique = false;
  let finalSlug = baseName;
  
  while (!isUnique) {
    const suffix = Math.random().toString(36).substring(2, 4); // "k9", "x2"
    finalSlug = `${baseName}-${suffix}`;
    isUnique = await checkSlugAvailability(finalSlug);
  }

  return finalSlug;
};

// --- Helper: Database Check ---
const checkSlugAvailability = async (slug) => {
  const { data, error } = await supabase
    .from('portfolios')
    .select('slug')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    console.warn('Slug check warning:', error.message);
    return false; // Assume taken if DB error to be safe
  }
  
  return !data; // True if no data found (it's free!)
};