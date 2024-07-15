"use server";
import { SupaServer } from "@/lib/supabase/server-component";
import { LikedSong } from "@/types";

const likeSongById = async (
  id: string,
  isLiked?: boolean | null
): Promise<{
  message: string;
  data: LikedSong | null;
  status: boolean;
}> => {
  const supabase = SupaServer();
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    return {
      message: "Đã có lỗi",
      data: null,
      status: false,
    };
  }

  if (isLiked) {
    const { error, data } = await supabase
      .from("liked_songs")
      .delete()
      .eq("user_id", sessionData.session?.user.id)
      .eq("song_id", id);
    if (error) {
      return {
        message: "Đã có lỗi",
        data,
        status: false,
      };
    } else {
      return {
        message: "Đã bỏ thích",
        data,
        status: true,
      };
    }
  } else {
    const { error, data } = await supabase.from("liked_songs").insert({
      song_id: id,
      user_id: sessionData.session?.user.id,
    });
    if (error) {
      return {
        message: "Đã có lỗi",
        data,
        status: false,
      };
    } else {
      return {
        message: "Đã thích",
        data,
        status: true,
      };
    }
  }
};

export default likeSongById;
