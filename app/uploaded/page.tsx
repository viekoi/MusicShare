import getSongsByUserId from "@/actions/server/getSongsByUserId";
import TableContent from "@/components/TableContent";
import { supaServer } from "@/lib/supabase/server-component";
import { redirect } from "next/navigation";

export default async function Uploaded() {
  const supabase = supaServer();
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (!sessionData.session || sessionError) {
    redirect("/");
  }
  const songs = await getSongsByUserId();
  return <TableContent songs={songs} />;
}
