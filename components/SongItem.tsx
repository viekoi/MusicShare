import React, { useCallback, useRef, useEffect } from "react";
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface SongItemProps {
  data: Song;
  active?: boolean;
  onClick: () => void;
  className?: string;
}

const SongItem: React.FC<SongItemProps> = ({
  data,
  onClick,
  active,
  className,
}) => {
  const imagePath = useLoadImage(data.image_path);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const img = button.querySelector("img");
      if (img === null) return;
      img.style.left = `${e.clientX - rect.left}px`;
      img.style.top = `${e.clientY - rect.top}px`;
    };

    button.addEventListener("mousemove", handleMouseMove);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <button
      className={cn(`songItem group w-full`, active && "active", className)}
      ref={buttonRef}
      onClick={onClick}
    >
      <span className="lg:text-[40px] md:text-[30px] text-[15px]">
        {`${data.title} - ${data.author}`}
      </span>
      {imagePath && <img src={imagePath} alt="image" />}
    </button>
  );
};

export default SongItem;
