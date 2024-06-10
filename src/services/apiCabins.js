import { PAGE_SIZE } from "../utilities/constants";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins({ page, filter, sort }) {
  let query = supabase.from("cabins").select("*", { count: "exact" });
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
  let { data: cabins, error, count } = await query;
  if (error) throw new Error(`cabins could not be loaded`);
  return { cabins, count };
}

export async function deleteCabin(id) {
  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(`Cabin ${data.name} could not be deleted`);
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
    if (createError)
      throw new Error(`Cabin ${createData.name} could not be created!`);
    return createData;
  } else {
    const { data: updateData, error: updateError } = await supabase
      .from("cabins")
      .update({ ...cabinData, image: imgUrl })
      .eq("id", editId)
      .select()
      .single();
    if (updateError)
      throw new Error(`Cabin ${updateData.name} could not be updated!`);
    return updateData;
  }
}
