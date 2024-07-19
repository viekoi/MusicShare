"use client";

import { useEffect, useState, useRef } from "react";

import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import MediaItem from "./MediaItem";
import useMobilePlayerModal from "@/hooks/useMobilePlayerModal";
import MobilePlayerModal from "./modals/MobilePlayerModal";
import {
  ChevronsLeft,
  ChevronsRight,
  Pause,
  Play,
  Repeat,
  Shuffle,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [isPlaying, setIsPlaying] = useState(false);

  const [progress, setProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(new Audio(songUrl));

  const intervalRef = useRef<NodeJS.Timer>();
  const mobilePlayerModal = useMobilePlayerModal();

  audioRef.current.volume = player.volume;

  const { duration } = audioRef.current;

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

  const Icon = isPlaying ? Pause : Play;
  const VolumeIcon = player.volume === 0 ? VolumeX : Volume2;

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);

    if (player.isRandom) {
      let randomIndex = Math.floor(Math.random() * player.ids.length);

      while (randomIndex === currentIndex) {
        randomIndex = Math.floor(Math.random() * player.ids.length);
      }

      const nextSong = player.ids[randomIndex];

      return player.setId(nextSong);
    } else {
      const nextSong = player.ids[currentIndex + 1];
      if (!nextSong) {
        player.setId(player.ids[0]);

        return;
      }
      return player.setId(nextSong);
    }
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);

    if (player.isRandom) {
      let randomIndex = Math.floor(Math.random() * player.ids.length);

      while (randomIndex === currentIndex) {
        randomIndex = Math.floor(Math.random() * player.ids.length);
      }
      const previousSong = player.ids[randomIndex];

      return player.setId(previousSong);
    } else {
      const previousSong = player.ids[currentIndex - 1];

      if (!previousSong) {
        return player.setId(player.ids[player.ids.length - 1]);
      }

      return player.setId(previousSong);
    }
  };

  const handleVolumeChange = (value: number) => {
    if (!audioRef.current.src) {
      return;
    }
    audioRef.current.volume = value;
    player.setVolume(value);
  };

  const handleProgressChange = (value: number) => {
    if (!audioRef.current.src) return;
    onPause();
    setProgress(value);
    audioRef.current.currentTime = value;
    onPlay();
  };

  const onPlay = () => {
    if (!audioRef.current.src) {
      return;
    }
    setIsPlaying(true);
  };

  const onPause = () => {
    if (!audioRef.current.src) {
      return;
    }

    setIsPlaying(false);
  };

  const handlePlay = (e: any) => {
    e.stopPropagation();
    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  const toggleMute = () => {
    if (!audioRef.current.src) {
      return;
    }

    if (audioRef.current?.volume === 0) {
      audioRef.current.volume = player.prevVolume;
      player.toggleMute();
    } else if (audioRef.current?.volume !== 0) {
      audioRef.current.volume = 0;
      player.toggleMute();
    }
  };

  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setProgress(audioRef.current.currentTime);
    }, 1000);
  };

  audioRef.current.onplay = () => {
    onPlay();
    startTimer();
  };

  audioRef.current.onpause = () => {
    onPause();
    clearInterval(intervalRef.current);
  };

  audioRef.current.onended = () => {
    console.log("1");
    audioRef.current.pause();

    if (player.isRepeated) {
      console.log("2");
      audioRef.current.play();
      onPlay();
      return;
    }
    console.log("3");
    onPlayNext();
  };

  useEffect(() => {
    console.log("5");
    audioRef.current.play();

    return () => {
      console.log("4");
      audioRef.current.pause();
    };
  }, [audioRef.current]);

  return (
    <>
      <div className="hidden h-full lg:flex justify-between gap-x-2  ">
        <div className="flex w-full items-center gap-1 justify-start">
          <div className="overflow-hidden">
            <MediaItem data={song} />
          </div>
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
              onClick={() => {
                player.toggleRepeat();
              }}
            >
              <Repeat
                size={20}
                className={player.isRepeated ? `` : `text-gray-400`}
              />
            </Button>
            <Button variant={"link"} size={"icon"} onClick={onPlayPrevious}>
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
              onClick={handlePlay}
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
              <Icon size={25} />
            </Button>
            <Button variant={"link"} size={"icon"} onClick={onPlayNext}>
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

      <div
        className="grid grid-cols-3 h-full lg:hidden"
        onClick={mobilePlayerModal.onOpen}
      >
        <div className="flex w-full items-center gap-1 justify-start col-span-2 ">
          <div className="overflow-hidden">
            <MediaItem data={song} />
          </div>
        </div>

        <div
          className="
            flex 
            w-full 
            justify-end 
            items-center
            col-span-1
          "
        >
          <Button
            onClick={handlePlay}
            variant={"link"}
            className="
             
              flex 
              items-center 
              justify-center  
             
              r-4
              cursor-pointer
            "
          >
            <Icon size={30} />
          </Button>
        </div>
      </div>
      <MobilePlayerModal
        playIcon={Icon}
        calculateTime={calculateTime}
        song={song}
        handleProgressChange={handleProgressChange}
        duration={duration}
        progress={progress}
        onPlayNext={onPlayNext}
        onPlayPrevious={onPlayPrevious}
        handlePlay={handlePlay}
      />
    </>
  );
};

export default PlayerContent;
