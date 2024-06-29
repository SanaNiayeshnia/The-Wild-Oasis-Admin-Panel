import supabase, { supabaseUrl } from "./supabase";
async function signUp({ email, password, fullName }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { fullName, avatar: "" },
    },
  });
  if (error) throw new Error(error.message);
  return data;
}

async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error("Provided email or password are incorrect!");
  return data;
}

async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data.user;
}

async function logout() {
  let { error } = await supabase.auth.signOut();
  if (error) throw new Error("Something went wrong during the log out!");
}

async function updateUser({ fullName, avatar, password }) {
  const isUpdatingPassword = password;
  let query;

  if (isUpdatingPassword) {
    query = supabase.auth.updateUser({ password });
  } else {
    const imgName = `${Math.random()}-${avatar[0]?.name}`.replaceAll("/", "");
    const isAvatarUpdated = !avatar?.toString().startsWith(supabaseUrl);

    if (isAvatarUpdated) {
      const { error: avatarError } = await supabase.storage
        .from("avatars")
        .upload(imgName, avatar[0], {
          cacheControl: "3600",
          upsert: false,
        });

      if (avatarError) throw new Error(avatarError.message);
    }

    const imgUrl = isAvatarUpdated
      ? `${supabaseUrl}/storage/v1/object/public/avatars/${imgName}`
      : avatar;

    query = supabase.auth.updateUser({
      data: {
        fullName,
        avatar: imgUrl,
      },
    });
  }

  const { data: updatedData, error: updateError } = await query;
  if (updateError) throw new Error(updateError.message);
  return updatedData;
}

export { login, getCurrentUser, logout, signUp, updateUser };
