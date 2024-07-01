import supabase from "./supabase";

export async function getGuests() {
  let { data: guests, error } = await supabase.from("guests").select("*");
  if (error) throw new Error(error.message);
  return guests;
}
