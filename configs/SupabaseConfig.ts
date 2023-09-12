import { createClient } from '@supabase/supabase-js'
const dotenv = require("dotenv")
dotenv.config()
const supabaseUrl = process.env.SUPABASE_URL as string ;
const supabaseKey = process.env.SUPABASE_KEY as string;
console.log(supabaseUrl)
const supabase = createClient(supabaseUrl,supabaseKey, {
  auth: { persistSession: false },
});

export default supabase