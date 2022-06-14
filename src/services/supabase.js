const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()
const supabase = createClient(process.env.PUBLIC_SUPABASE_URL, process.env.PUBLIC_SUPABASE_ANON_KEY)

module.exports = supabase
