import { createBrowserClient } from "@supabase/ssr";

export default async function supaLogin(email: string, password: string) {
  const supabase = createBrowserClient(
    Cypress.env("NEXT_PUBLIC_SUPABASE_URL")!,
    Cypress.env("NEXT_PUBLIC_SUPABASE_ANON_KEY")!
  );
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