import { supaServer } from "@/lib/supabase/server-component";

import { Song } from "@/types";

const getSongById = async (id: string): Promise<Song[]> => {
  const supabase = supaServer();

  const { data, error } = await supabase.from("songs").select("*").eq("id", id);

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getSongById;
