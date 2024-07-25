import { createBrowserClient } from "@supabase/ssr";

export default function supaClient() {
  const supabase = createBrowserClient(
    Cypress.env("NEXT_PUBLIC_SUPABASE_URL")!,
    Cypress.env("NEXT_PUBLIC_SUPABASE_ANON_KEY")!
  );

  return supabase;
}
