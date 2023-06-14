"use client";

import { useEffect, useState, useRef } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";

import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";

import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";
import VolumeSlider from "./VolumeSlider";
import ProgessSlider from "./ProgessSlider";
import useMobilePlayerModal from "@/hooks/useMobilePlayerModal";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const toggleMuteVolume = useRef<number>(player.volume);
  const audioRef = useRef<HTMLAudioElement>(new Audio(songUrl));
  const intervalRef = useRef<NodeJS.Timer>();
  const mobilePlayerModal = useMobilePlayerModal()

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

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = player.volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

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

  const handlePlay = () => {
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
      audioRef.current.volume = toggleMuteVolume.current;
      player.setVolume(toggleMuteVolume.current);
    } else if (audioRef.current?.volume !== 0) {
      toggleMuteVolume.current = audioRef.current.volume;
      audioRef.current.volume = 0;
      player.setVolume(0);
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
    if (player.isRepeated) {
      return;
    }
    onPlayNext();
  };

  useEffect(() => {
    audioRef.current.play();

    return () => {
      audioRef.current.pause();
    };
  }, [audioRef.current.ended]);

  return (
    <>
      <div className=" hidden grid-cols-3 h-full md:grid ">
        <div className="flex w-full items-center gap-1 justify-start col-span-">
          <div className="overflow-hidden">
            <MediaItem data={song} />
          </div>
          <LikeButton songId={song.id} />
        </div>
        <div
          className="
              
              h-full
              flex 
              flex-col
              justify-start 
              items-center 
              w-full 
              gap-3
              max-w-[722px]
              col-span-1
             
             
            "
        >
          <div className="flex justify-center items-center gap-x-6 ">
            <AiFillStepBackward
              onClick={onPlayPrevious}
              size={20}
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
                h-[35px]
                w-[35px]
                rounded-full 
                bg-white 
                p-[2px] 
                cursor-pointer
              "
            >
              <Icon size={25} className="text-black" />
            </div>
            <AiFillStepForward
              onClick={onPlayNext}
              size={20}
              className="
                text-neutral-400 
                cursor-pointer 
                hover:text-white 
                transition
              "
            />
          </div>
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
        </div>
        <div className="col-span-1 flex w-full justify-end pr-2">
          <div className="flex items-center gap-x-2 w-[120px]">
            <VolumeIcon
              onClick={toggleMute}
              className="cursor-pointer"
              size={34}
            />
            <VolumeSlider
              value={player.volume}
              onChange={(value) => {
                handleVolumeChange(value);
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 h-full md:hidden" onClick={mobilePlayerModal.onOpen}>
        <div className="flex w-full items-center gap-1 justify-start col-span-1 ">
          <div className="overflow-hidden">
            <MediaItem data={song} />
          </div>
          <LikeButton songId={song.id} />
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
          <div
            onClick={handlePlay}
            className="
              h-10
              w-10
              flex 
              items-center 
              justify-center 
              rounded-full 
              bg-white 
              p-1 
              cursor-pointer
            "
          >
            <Icon size={30} className="text-black" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayerContent;
