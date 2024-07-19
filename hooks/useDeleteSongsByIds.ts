import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Song } from "@/types";

const useDeleteSongsByIds = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();
  const { supabaseClient } = useSessionContext();

  const router = useRouter();

  const deleteSongsByIds = async (songs: Song[]) => {
    console.log(songs)
    setIsLoading(true);
    const { data: sessionData, error: sessionError } =
      await supabaseClient.auth.getSession();
  
    if (sessionError || !sessionData.session) {
      return { status: false, message: "Người dùng không có quyền truy cập" };
    }
    console.log(songs)
    const ids = songs.map((song) => song.id);
    const filePaths = songs.map((song) => song.song_path);
    const imagePaths = songs.map((song) => song.image_path);
    console.log(ids)
    const { data, error } = await supabaseClient
      .from("songs")
      .delete()
      .in("id", ids);
  
    if (error) {
      setData(null);
      toast.error("Xóa không thành công");
      setIsLoading(false);
      return;
    }
  
    try {
      await Promise.all([
        supabaseClient.storage.from("songs").remove(filePaths),
        supabaseClient.storage.from("images").remove(imagePaths)
      ]);
  
      setData(data);
      setIsLoading(false);
      toast.success("Xóa thành công");
      router.refresh();
    } catch (storageError) {
      console.error("Error removing files:", storageError);
      toast.error("Xóa không thành công");
      setIsLoading(false);
    }
  };
  return useMemo(
    () => ({
      deleteSongsByIds,
      isLoading,
      data,
    }),
    [isLoading, data]
  );
};

export default useDeleteSongsByIds;
