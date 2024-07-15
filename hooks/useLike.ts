import likeSongById from "@/actions/server/likeSongById";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLike = (id: string, isLiked?: boolean | null) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => likeSongById(id, isLiked),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["likedSong", { id }] });
    },
  });
};
