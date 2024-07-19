"use client";

import Image from "next/image";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import { cn } from "@/lib/utils";

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
  className?: string;
}

const MediaItem: React.FC<MediaItemProps> = ({ data, onClick, className }) => {
  const player = usePlayer();
  const imageUrl = useLoadImage(data.image_path);

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }

    return player.setId(data.id);
  };

  return (
    <div
      id="media-item"
      onClick={handleClick}
      className={cn(` flex 
        items-center 
        gap-x-3 
        cursor-pointer 
        hover:bg-secondary
        w-full 
        p-2 
        rounded-md`,className)}
    >
      <div
        className="
          relative 
          rounded-md 
          min-h-[48px] 
          min-w-[48px] 
          overflow-hidden
        "
      >
        {imageUrl && (
          <Image fill src={imageUrl} alt="MediaItem" className="object-cover" />
        )}
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">{data.title}</p>
        <p className="text-neutral-400 text-sm truncate">By {data.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;
