require("dotenv").config({ path: "../.env" });
const { createClient } = require("@supabase/supabase-js");

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_KEY;

const supabase = createClient(url, key, {
    db:{
        schema: 'public'
    },
    auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false
    }
});


module.exports = supabase;