import { PAGE_SIZE } from "../utilities/constants";
import supabase from "./supabase";

async function getBookings({ filter, sort, page }) {
  let query = supabase
    .from("bookings")
    .select("* , cabins(*), guests(*)", { count: "exact" });
  if (filter) {
    query = query[filter.func](filter.name, filter.value);
  }
  if (sort) {
    query = query.order(sort.name, { ascending: sort.type === "asc" });
  }
  if (page)
    query = query.range(
      (page - 1) * PAGE_SIZE,
      (page - 1) * PAGE_SIZE + (PAGE_SIZE - 1)
    );
  let { data: bookings, error, count } = await query;

  if (error) throw new Error("Can't get the bookings data");
  return { bookings, count };
}

async function getBooking(id) {
  const {
    data: booking,
    isLoading,
    error,
  } = await supabase
    .from("bookings")
    .select("* , cabins(*), guests(*)")
    .eq("id", id)
    .single();
  if (error) throw new Error("Can't get the booking data");
  return booking;
}
export { getBookings, getBooking };
