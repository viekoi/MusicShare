import React from "react";
import { Button } from "./ui/button";
import {
  ChevronsLeft,
  ChevronsRight,
  Play,
  Repeat,
  Shuffle,
  Volume2,
  VolumeX,
} from "lucide-react";
import usePlayer from "@/hooks/usePlayer";
import { Slider } from "./ui/slider";

const calculateTime = (duration: number) => {
  if (!duration) return <span className="text-[10px]">00:00</span>;
  const minutes = Math.floor(duration / 60);
  const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const seconds = Math.floor(duration % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return (
    <span className="text-[10px]">
      {returnedMinutes}:{returnedSeconds}
    </span>
  );
};

const StaticPlayerContent = () => {
  const player = usePlayer();
  const VolumeIcon = player.volume === 0 ? VolumeX : Volume2;

  const handleVolumeChange = (value: number) => {
    player.setVolume(value);
  };

  const toggleMute = () => {
    player.toggleMute();
  };

  return (
    <>
      <div className="hidden h-full lg:flex justify-between gap-x-2  ">
        <div className="flex w-full items-center gap-1 justify-start">
          <div className="overflow-hidden"></div>
        </div>
        <div
          className="
              h-full
              flex 
              flex-col
              justify-start 
              items-center 
              w-full 
              gap-y-2
            "
        >
          <div className="flex  justify-center items-center gap-6">
            <Button
              variant={"link"}
              size={"icon"}
              onClick={() => player.toggleRepeat()}
            >
              <Repeat
                size={20}
                className={player.isRepeated ? `` : `text-gray-400`}
              />
            </Button>
            <Button variant={"link"} size={"icon"} disabled>
              <ChevronsLeft
                size={25}
                className="
                hover:opacity-50
                transition
              "
              />
            </Button>

            <Button
              variant={"link"}
              disabled
              className="
                flex 
                items-center 
                justify-center
                h-[35px]
                w-[35px] 
                p-[2px] 
                cursor-pointer
                hover:opacity-90
                transition
              "
            >
              <Play size={25} />
            </Button>
            <Button variant={"link"} size={"icon"} disabled>
              <ChevronsRight
                size={25}
                className="
               hover:opacity-50
                transition
              "
              />
            </Button>
            <Button
              variant={"link"}
              size={"icon"}
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
          <div className=" w-full flex items-center gap-1">
            {calculateTime(0)}
            <Slider value={[0]} defaultValue={[1]} max={1} step={1} disabled />
            {calculateTime(0)}
          </div>
        </div>
        <div className=" flex w-full justify-end">
          <div className="flex items-center gap-x-2 w-[120px]">
            <Button size={"icon"} variant={"link"}>
              <VolumeIcon
                onClick={toggleMute}
                className="cursor-pointer"
                size={25}
              />
            </Button>
            <Slider
              value={[player.volume]}
              defaultValue={[1]}
              max={1}
              step={0.1}
              onValueChange={(value) => {
                handleVolumeChange(value[0]);
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex h-full lg:hidden">
        <div
          className="
            flex 
            w-full 
            justify-center
            items-center
            gap-x-2
           
          "
        >
          <Button
            variant={"link"}
            size={"icon"}
            onClick={() => {
              player.toggleRepeat();
            }}
          >
            <Repeat
              size={20}
              className={player.isRepeated ? `` : `text-gray-400`}
            />
          </Button>
          <Button variant={"link"} size={"icon"} disabled>
            <ChevronsLeft
              size={25}
              className="
                hover:opacity-50
                transition
              "
            />
          </Button>
          <Button
            disabled
            size={"icon"}
            variant={"link"}
            className="
              flex 
              items-center 
              justify-center  
              r-4
              cursor-pointer
              bg-secondary
              rounded-full
            "
          >
            <Play size={30} />
          </Button>
          <Button variant={"link"} size={"icon"} disabled>
            <ChevronsRight
              size={25}
              className="
                hover:opacity-50
                transition
              "
            />
          </Button>
          <Button
            variant={"link"}
            size={"icon"}
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
    </>
  );
};

export default StaticPlayerContent;
