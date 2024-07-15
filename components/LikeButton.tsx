"use client";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { toast } from "react-hot-toast";

import Button from "./Button";

import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";

import { useGetLikedSongById } from "@/hooks/useGetLikedSong";
import { useLike } from "@/hooks/useLike";
import { useRouter } from "next/navigation";

interface LikeButtonProps {
  songId: string;
  className?: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId, className }) => {
  const authModal = useAuthModal();
  const router = useRouter();
  const { user } = useUser();

  const { data: isLiked, isPending: isLikedSongPending } =
    useGetLikedSongById(songId);

  const { mutateAsync: handleMutateLike, isPending: isLiking } = useLike(
    songId,
    !!isLiked
  );

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async (event: any) => {
    event.stopPropagation();
    if (!user) {
      return authModal.onOpen();
    }

    const { status, data, message } = await handleMutateLike();
    if (status) {
      toast.success(message);
    } else {
      toast.error(message);
    }

    router.refresh();
  };

  if (isLikedSongPending || isLikedSongPending) return;

  return (
    <Button
      className={`${className} cursor-pointer 
        hover:opacity-75 
        transition`}
      onClick={handleLike}
    >
      <Icon
        color={isLiked ? "#22c55e" : "white"}
        className=" text-[15px] md:text-[20px]"
      />
    </Button>
  );
};

export default LikeButton;
