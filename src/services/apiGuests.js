import { PAGE_SIZE } from "../utilities/constants";
import supabase from "./supabase";

export async function getGuests({ page, sort, searchQuery }) {
  let query = supabase.from("guests").select("*", { count: "exact" });
  if (sort) {
    query = query.order(sort.name, { ascending: sort.type === "asc" });
  }
  if (page)
    query = query.range(
      (page - 1) * PAGE_SIZE,
      (page - 1) * PAGE_SIZE + (PAGE_SIZE - 1)
    );
  if (searchQuery) {
    query = query.ilike("fullName", `%${searchQuery}%`);
  }
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

export async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    return res.json();
  } catch (error) {
    console.log(error.message);
    return [];
  }
}
