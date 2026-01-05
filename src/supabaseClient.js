import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dmhdguerlzstchzjeknx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtaGRndWVybHpzdGNoempla254Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1NzYzNzEsImV4cCI6MjA4MzE1MjM3MX0.N-C85z7VkQE_uFDcYYbV9q05dLkRCPGzElW38he-yZc'

export const supabase = createClient(supabaseUrl, supabaseKey)