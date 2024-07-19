"use client";
import React from "react";

import { Song } from "@/types";
import useMobilePlayerModal from "@/hooks/useMobilePlayerModal";
import useLoadImage from "@/hooks/useLoadImage";
import { Button } from "../ui/button";
import { ChevronsLeft, ChevronsRight, Repeat, Shuffle } from "lucide-react";
import usePlayer from "@/hooks/usePlayer";
import { Slider } from "../ui/slider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";

interface MobilePlayerModalProps {
  song: Song;
  progress: number;
  duration: number;
  handleProgressChange: (value: number) => void;
  calculateTime: (duration: number) => JSX.Element;
  onPlayPrevious: () => void;
  handlePlay: (e: any) => void;
  onPlayNext: () => void;
  playIcon: any;
}

const MobilePlayerModal: React.FC<MobilePlayerModalProps> = ({
  song,
  duration,
  progress,
  handleProgressChange,
  calculateTime,
  handlePlay,
  onPlayNext,
  onPlayPrevious,
  playIcon: Icon,
}) => {
  const mobilePlayerModal = useMobilePlayerModal();
  const player = usePlayer();
  const onChange = (open: boolean) => {
    if (!open) {
      mobilePlayerModal.onClose();
    }
  };
  const imgPath = useLoadImage(song.image_path);

  return (
    <Dialog
      open={mobilePlayerModal.isOpen}
      defaultOpen={mobilePlayerModal.isOpen}
      onOpenChange={onChange}
    >
      <DialogPortal>
        <DialogOverlay
          className="
          bg-neutral-900/90 
          backdrop-blur-sm 
          fixed 
          inset-0
          z-50
        "
        />
        <DialogContent
          className="
          fixed 
          drop-shadow-md 
          border 
          border-neutral-700 
          top-[50%] 
          left-[50%] 
          max-h-full 
          h-full 
          w-full 
          translate-x-[-50%] 
          translate-y-[-50%] 
          rounded-md 
          bg-neutral-800 
          p-[25px] 
          focus:outline-none
          z-50
          flex
          flex-col
        "
        >
          <DialogTitle
            className="
            text-xl 
            text-center 
            font-bold 
            mb-4
          "
          >
            {song.title}
          </DialogTitle>
          <DialogDescription
            className="
            mb-5 
            text-sm 
            leading-normal 
            text-center
          "
          >
            {song.author}
          </DialogDescription>

          <div className="flex flex-col items-center flex-1 justify-between">
            <div className=" w-full h-[60vh] object-cover flex flex-row items-center justify-center">
              {imgPath && (
                <img
                  src={imgPath}
                  className=" max-w-[100vw] max-h-[60vh]"
                  alt="image"
                />
              )}
            </div>
            <div className=" w-full flex flex-col gap-4">
              <div className=" w-full flex items-center gap-1">
                {calculateTime(progress)}
                <Slider
                  value={[progress]}
                  defaultValue={[1]}
                  max={duration}
                  step={1}
                  onValueChange={(value) => {
                    handleProgressChange(value[0]);
                  }}
                />
                {calculateTime(duration)}
              </div>
              <div className="flex justify-center items-center gap-x-6 ">
                <Button
                  variant={"link"}
                  onClick={() => {
                    player.toggleRepeat();
                  }}
                >
                  <Repeat
                    size={20}
                    className={player.isRepeated ? `` : `text-gray-400`}
                  />
                </Button>
                <Button variant={"link"} size={"icon"}>
                  <ChevronsLeft
                    onClick={onPlayPrevious}
                    size={30}
                    className="    
                    hover:opacity-50
                    transition
                  "
                  />
                </Button>

                <Button
                  variant={"link"}
                  size={"icon"}
                  onClick={handlePlay}
                  className="
                  flex 
                  items-center 
                  justify-center
                  h-[50px]
                  w-[50px]
                  p-[2px] 
                  cursor-pointer
                "
                >
                  <Icon size={40} />
                </Button>
                <Button variant={"link"} size={"icon"}>
                  <ChevronsRight
                    onClick={onPlayNext}
                    size={30}
                    className="
                hover:opacity-50
                    transition
                "
                  />
                </Button>

                <Button
                  variant={"link"}
                  onClick={() => {
                    player.toggleRandom();
                  }}
                >
                  <Shuffle
                    size={20}
                    className={player.isRandom ? `` : `text-gray-400`}
                  />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default MobilePlayerModal;
