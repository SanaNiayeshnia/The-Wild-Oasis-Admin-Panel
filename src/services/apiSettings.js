import supabase from "./supabase";
export async function getSettings() {
  let { data: settings, error } = await supabase
    .from("settings")
    .select("*")
    .single();
  if (error) throw new Error("Settings could not be loaded!");
  console.log(settings);
  return settings;
}

export async function updateSettings(settings) {
  const { error } = await supabase
    .from("settings")
    .update(settings)
    .eq("id", 1);
  if (error) throw new Error("Settings could not be updated!");
}
