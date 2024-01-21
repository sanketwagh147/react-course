import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://uuknaakoauvqxlstdbdf.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1a25hYWtvYXV2cXhsc3RkYmRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU4MTkxOTIsImV4cCI6MjAyMTM5NTE5Mn0.AiVVzivjuZfbyVW8wgamD9Hkc5zrzt7P7O_q3zcwgKg";
export const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
