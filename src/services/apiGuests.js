import { PAGE_SIZE } from "../utilities/constants";
import supabase from "./supabase";

export async function getGuests({ page }) {
  let query = supabase.from("guests").select("*", { count: "exact" });
  if (page)
    query = query.range(
      (page - 1) * PAGE_SIZE,
      (page - 1) * PAGE_SIZE + (PAGE_SIZE - 1)
    );
  let { data: guests, error, count } = await query;
  if (error) throw new Error("Failed to load the guests!");
  return { guests, count };
}

export async function createGuest(guest) {
  const { data, error } = await supabase
    .from("guests")
    .insert([guest])
    .select()
    .single();

  if (error) throw new Error("Failed to create the new user!");
  return data;
}

export async function deleteGuest(id) {
  const { data, error } = await supabase.from("guests").delete().eq("id", id);

  if (error) throw new Error("Failed to delete the guest!");
  return data;
}

export async function updateGuest({ editId, guest }) {
  const { data, error } = await supabase
    .from("guests")
    .update(guest)
    .eq("id", editId)
    .select()
    .single();
  if (error) throw new Error("Failed to update the guest info!");
  return data;
}
