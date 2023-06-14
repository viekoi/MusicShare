"use client";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";

import { Song } from "@/types";
import useMobilePlayerModal from "@/hooks/useMobilePlayerModal";
import ProgessSlider from "../ProgessSlider";
import useLoadImage from "@/hooks/useLoadImage";


interface MobilePlayerModalProps {
  audio: HTMLAudioElement;
  song: Song;
  progress: number;
  duration: number;
  handleProgressChange: (value: number) => void;
  calculateTime: (duration: number) => JSX.Element;
  onPlayPrevious: () => void;
  handlePlay: () => void;
  onPlayNext: () => void;
  playIcon: any;
}

const MobilePlayerModal: React.FC<MobilePlayerModalProps> = ({
  audio,
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

  const onChange = (open: boolean) => {
    if (!open) {
      mobilePlayerModal.onClose();
    }
  };
  const imgPath = useLoadImage(song.image_path);
  return (
    <Dialog.Root
      open={mobilePlayerModal.isOpen}
      defaultOpen={mobilePlayerModal.isOpen}
      onOpenChange={onChange}
    >
      <Dialog.Portal>
        <Dialog.Overlay
          className="
          bg-neutral-900/90 
          backdrop-blur-sm 
          fixed 
          inset-0
          z-50
        "
        />
        <Dialog.Content
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
          <Dialog.Title
            className="
            text-xl 
            text-center 
            font-bold 
            mb-4
          "
          >
            {song.title}
          </Dialog.Title>
          <Dialog.Description
            className="
            mb-5 
            text-sm 
            leading-normal 
            text-center
          "
          >
            {song.author}
          </Dialog.Description>

          <div className="flex flex-col items-center flex-1 justify-between">
            <div className=" w-full h-[60vh] flex flex-row items-center justify-center">
              {imgPath && (
               <img src={imgPath} className=" max-w-[100vw] max-h-[60vh]" alt="image" />
              )}
            </div>
            <div className=" w-full flex flex-col gap-4">
              <div className=" w-full flex items-center gap-1">
                {calculateTime(progress)}
                <ProgessSlider
                  value={progress}
                  duration={duration}
                  onChange={(value) => {
                    handleProgressChange(value);
                  }}
                />
                {calculateTime(duration)}
              </div>
              <div className="flex justify-center items-center gap-x-6 ">
                <AiFillStepBackward
                  onClick={onPlayPrevious}
                  size={30}
                  className="
                  text-neutral-400 
                  cursor-pointer 
                  hover:text-white 
                  transition
                "
                />
                <div
                  onClick={handlePlay}
                  className="
                  flex 
                  items-center 
                  justify-center
                  h-[50px]
                  w-[50px]
                  rounded-full 
                  bg-white 
                  p-[2px] 
                  cursor-pointer
                "
                >
                  <Icon size={40} className="text-black" />
                </div>
                <AiFillStepForward
                  onClick={onPlayNext}
                  size={30}
                  className="
                  text-neutral-400 
                  cursor-pointer 
                  hover:text-white 
                  transition
                "
                />
              </div>
            </div>
          </div>

          <Dialog.Close asChild>
            <button
              className="
              text-neutral-400 
              hover:text-white 
              absolute 
              top-[10px] 
              right-[10px] 
              inline-flex 
              h-[25px] 
              w-[25px] 
              appearance-none 
              items-center 
              justify-center 
              rounded-full 
              focus:outline-none
            "
              aria-label="Close"
            >
              <IoMdClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MobilePlayerModal;
