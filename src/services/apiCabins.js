import supabase from "./supabase";
export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) throw new Error(`cabins could not be loaded`);
  return cabins;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) throw new Error(`cabin ${id} could not be ldeleted`);
}

export async function addNewCabin(cabin) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([cabin])
    .select();
}
