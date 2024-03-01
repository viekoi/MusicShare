"use client";

import React, { useCallback } from "react";
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import LikeButton from "./LikeButton";

interface SongItemProps {
  data: Song;
  active?: boolean;
  onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({ data, onClick, active }) => {
  const imagePath = useLoadImage(data.image_path);

  const divEleRef = useCallback((divEle: HTMLDivElement) => {
    if (divEle === null) return;

    divEle.onmousemove = (e: MouseEvent) => {
      const rect = divEle.getBoundingClientRect(),
        img = divEle.querySelector("img");
      if (img === null) return;
      img.style.left = `${e.clientX - rect.left}px`;
      img.style.top = `${e.clientY - rect.top}px`;
    };
  }, []);

  const handleClick:
    | React.MouseEventHandler<HTMLDivElement>
    | undefined = () => {
    if (onClick) {
      return onClick(data.id);
    }
  };

  return (
    <div
      className={`songItem group ${active && "active"}`}
      ref={divEleRef}
      onClick={handleClick}
    >
      <span className="lg:text-[40px] md:text-[30px] text-[15px]">
        {`${data.title} - ${data.author}`}
        <LikeButton className="hidden group-hover:block" songId={data.id} />
      </span>
      {imagePath && <img src={imagePath} alt="image" />}
    </div>
  );
};

export default SongItem;
