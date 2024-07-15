"use server";
import { SupaServer } from "@/lib/supabase/server-component";
import { LikedSong } from "@/types";

const getLikedSong = async (id: string): Promise<LikedSong | null> => {
  const supabase = SupaServer();
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.log(sessionError.message);
    return null;
  }

  const { data, error } = await supabase
    .from("liked_songs")
    .select("*")
    .eq("user_id", sessionData.session?.user.id)
    .eq("song_id", id)
    .single();

  if (error) {
    console.log(error.message);
  }

  return (data as LikedSong) || null;
};

export default getLikedSong;
