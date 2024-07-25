import supaClient from "../lib/supabase/supabase-client";

export default async function supaLogin(email: string, password: string) {
  const supabase = supaClient();
  console.log(email, password);
  return await supabase.auth
    .signInWithPassword({
      email,
      password,
    })
    .then((response) => {
      if (response.error) {
        return Promise.reject(response.error.message);
      }
    })
    .catch((e) => {
      console.error(e);

      return Promise.reject(e);
    });
}
