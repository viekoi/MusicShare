import { SupaServer } from "@/lib/supabase/server-component";

import { Song } from "@/types";

const getSongs = async (): Promise<Song[]> => {
  const supabase = SupaServer();

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getSongs;
