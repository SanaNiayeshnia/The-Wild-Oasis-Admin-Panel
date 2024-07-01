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

  if (error) throw new Error("Failed to get the bookings data");
  return { bookings, count };
}

async function getBooking(id) {
  const { data: booking, error } = await supabase
    .from("bookings")
    .select("* , cabins(*), guests(*)")
    .eq("id", id)
    .single();
  if (error) throw new Error(`Failed to get booking ${id} data`);
  return booking;
}

async function createBooking(booking) {
  const { data, error } = await supabase
    .from("bookings")
    .insert([booking])
    .select();
  if (error) throw new Error("Failed to create the new booking!");
  return data;
}

async function updateBooking({ editId, bookingObj }) {
  const { error } = await supabase
    .from("bookings")
    .update(bookingObj)
    .eq("id", editId)
    .select();
  if (error) throw new Error(`Failed to update booking ${editId}!`);
}

async function deleteBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(`Failed to delete booking ${id}!`);
  return data;
}

export { getBookings, getBooking, updateBooking, deleteBooking, createBooking };
