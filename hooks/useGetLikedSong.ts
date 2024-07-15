import getLikedSong from "@/actions/server/getLikedSong";
import { useQuery } from "@tanstack/react-query";

export const useGetLikedSongById = (id: string) => {
  return useQuery({
    queryKey: ["likedSong", { id }],
    queryFn: () => getLikedSong(id),
  });
};
