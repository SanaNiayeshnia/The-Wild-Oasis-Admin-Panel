import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data: cabins, error } = await supabase
    .from("cabins")
    .select("*")
    .order("name");
  if (error) throw new Error(`cabins could not be loaded`);
  return cabins;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(`cabin ${id} could not be deleted`);
  return data;
}

export async function createEditCabin({ cabinData, editId }) {
  const imgName = `${Math.random() * 100}-${
    cabinData?.image[0]?.name
  }`.replaceAll("/", "");
  const imgUrl = cabinData?.image?.toString().startsWith(supabaseUrl)
    ? cabinData.image
    : `${supabaseUrl}/storage/v1/object/public/cabins/${imgName}`;

  if (!cabinData?.image?.toString().startsWith(supabaseUrl)) {
    const { error: storageError } = await supabase.storage
      .from("cabins")
      .upload(imgName, cabinData?.image[0], {
        cacheControl: "3600",
        upsert: false,
      });
    if (storageError) throw new Error("The image could not be uploaded!");
  }

  if (!editId) {
    const { data: createData, error: createError } = await supabase
      .from("cabins")
      .insert([{ ...cabinData, image: imgUrl }])
      .select()
      .single();
    if (createError) throw new Error("The Cabin could not be created!");
    return createData;
  } else {
    const { data: updateData, error: updateError } = await supabase
      .from("cabins")
      .update({ ...cabinData, image: imgUrl })
      .eq("id", editId)
      .select()
      .single();
    if (updateError) throw new Error("The Cabin could not be updated!");
    return updateData;
  }
}
