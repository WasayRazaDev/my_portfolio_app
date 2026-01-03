import { supabase } from "../lib/supabase";

export const signup = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) console.error(error.message);
  else console.log("Signed up!", data.user);

  return { data, error };
};

export const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) console.error(error.message);
  else console.log("Logged in!", data.user);

  return { data, error };
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.error(error.message);
};
