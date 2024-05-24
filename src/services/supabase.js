import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://mshaafmnyquwisotlwxx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zaGFhZm1ueXF1d2lzb3Rsd3h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM1MzAyMzEsImV4cCI6MjAyOTEwNjIzMX0.fKpVP4sZca1cbguFkec7lGuDKDiZrEUdDZQfIG66LfQ";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
export { supabaseUrl };
