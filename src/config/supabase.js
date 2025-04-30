const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const supabaseUrl = process.env.VITE_APP_ENV_SUPABASE_URL;
const supabasePublicKey = process.env.VITE_APP_ENV_SUPABASE_PUBLICKEY;
const supabasePrivateKey = process.env.VITE_APP_ENV_SUPABASE_PRIVATEKEY;
const supabaseJwtSecret = process.env.VITE_APP_ENV_SUPABASE_JWTSECRET;
 
const supabase = createClient(supabaseUrl, supabasePrivateKey);

class supabaseConfig {  
  supabase = supabase; 
  supabaseJwtSecret = supabaseJwtSecret;
}
  
module.exports = new supabaseConfig(); 
