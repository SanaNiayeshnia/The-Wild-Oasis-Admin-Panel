import supabase from "./supabase";

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

export { login, getCurrentUser, logout };
