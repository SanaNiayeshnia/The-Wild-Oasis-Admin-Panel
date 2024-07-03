import { PAGE_SIZE } from "../utilities/constants";
import { getToday } from "../utilities/helper";
import supabase from "./supabase";

async function getBookings({ filter, sort, page, searchQuery }) {
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
  if (searchQuery) {
    const { data: filteredGuests, error: guestsError } = await supabase
      .from("guests")
      .select("id")
      .ilike("fullName", `%${searchQuery}%`);

    if (guestsError) throw new Error("Failed to filter guests");

    const guestIds = filteredGuests.map((guest) => guest.id);
    if (guestIds.length > 0) {
      query = query.in("guestId", guestIds);
    } else {
      return { bookings: [], count: 0 };
    }
  }
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

async function createBookings(bookings) {
  const { data, error } = await supabase
    .from("bookings")
    .insert(bookings)
    .select();
  if (error) throw new Error("Failed to create fake booking data!");
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

async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .gte("created_at", date)
    .lte("created_at", getToday());

  if (error) throw new Error(error.message);
  return data;
}

async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("stratDate", date)
    .lte("startDate", getToday());

  if (error) throw new Error(error.message);
  return data;
}

async function getTodaysBookings() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${year}-${month}-${day}`;

  const {
    data: todaysBookings,
    error,
    count,
  } = await supabase
    .from("bookings")
    .select("*, guests(fullName)", { count: "exact" })
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${formattedToday}),and(status.eq.checked in,endDate.eq.${formattedToday})`
    );

  if (error) throw new Error(error.message);

  return { todaysBookings, count };
}

export {
  getBookings,
  getBooking,
  updateBooking,
  deleteBooking,
  createBooking,
  getBookingsAfterDate,
  getStaysAfterDate,
  getTodaysBookings,
  createBookings,
};
