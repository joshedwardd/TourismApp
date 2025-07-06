import { createClient } from "@supabase/supabase-js"
// import jwt from 'jsonwebtoken'

// const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET)

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Export for convenience
export default supabase
