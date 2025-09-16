import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ulrhrdknjnxpiqlowtya.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVscmhyZGtuam54cGlxbG93dHlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1OTI3MzQsImV4cCI6MjA3MzE2ODczNH0.BSYyAy6ThJDLutXWiWC0Hk8zbwzceuCqsCDvKwTLAKE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
