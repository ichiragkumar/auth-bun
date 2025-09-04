


import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!; 
// ⚠️ Use the Service Role Key only on backend (never expose to frontend)

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
