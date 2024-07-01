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
