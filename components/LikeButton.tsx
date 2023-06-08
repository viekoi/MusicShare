"use client";

import { useEffect, useState } from "react";


import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";

import Button from "./Button";

import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";

interface LikeButtonProps {
  songId: string;
  className?:string
};

const LikeButton: React.FC<LikeButtonProps> = ({
  songId,className
}) => {
  const {
    supabaseClient
  } = useSessionContext();
  const authModal = useAuthModal();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }
  
    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from('liked_songs')
        .select('*')
        .eq('user_id', user.id)
        .eq('song_id', songId)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    }

    fetchData();
  }, [songId, supabaseClient, user?.id]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async (event:any) => {
    event.stopPropagation()
    if (!user) {
      return authModal.onOpen();
    }

    if (isLiked) {
      const { error } = await supabaseClient
        .from('liked_songs')
        .delete()
        .eq('user_id', user.id)
        .eq('song_id', songId)

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(false);
      }
    } else {
      const { error } = await supabaseClient
        .from('liked_songs')
        .insert({
          song_id: songId,
          user_id: user.id
        });

      if (error) {
        toast.error('Đã có lỗi');
      } else {
        setIsLiked(true);
        toast.success('Đã thích');
      }
    }


  
  }

  return (
    <Button 

      className={
        `${className} cursor-pointer 
        hover:opacity-75 
        transition`
        
      }
      onClick={handleLike}
    >
      <Icon color={isLiked ? '#22c55e' : 'white'} className=" text-[15px] md:text-[20px]" />
    </Button>
  );
}

export default LikeButton;