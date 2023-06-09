"use client";

import { useEffect, useState, useRef } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";

import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";

import LikeButton from "./LikeButton";
import SearchItem from "./SearchItem";
import VolumeSlider from "./VolumeSlider";
import ProgessSlider from "./ProgessSlider";




interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({
  song,
  songUrl
}) => {

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0)

  const audioRef = useRef<HTMLAudioElement>(new Audio(songUrl))
  const intervalRef = useRef<NodeJS.Timer>()
  // const isReady = useRef(false)
  const { duration } = audioRef.current




  const player = usePlayer();
  const [volume, setVolume] = useState(1);



  const calculateTime = (duration: number) => {
    if(!duration) return(<span className="text-[10px]">00:00</span>)
    const minutes = Math.floor(duration / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(duration % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return (
      <span className="text-[10px]">{returnedMinutes}:{returnedSeconds}</span>
    );
  }


  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      player.setId(player.ids[0]);

      return
    }

    player.setId(nextSong);


  }

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);

  }




  const handleVolumeChange = (value: number) => {
    if (!audioRef.current.src) {
      return
    }

    audioRef.current.volume = value
    setVolume(value)
  }

  const handleProgressChange = (value: number) => {

    if (!audioRef.current.src) return
    onPause()
    setProgress(value)
    audioRef.current.currentTime = value
    onPlay()

  }



  const onPlay = () => {
    if (!audioRef.current.src) {
      return
    }
    setIsPlaying(true)


  }


  const onPause = () => {
    if (!audioRef.current.src) {
      return
    }

    setIsPlaying(false)


  }


  const handlePlay = () => {
    if (!isPlaying) {
      onPlay()
    } else {
      onPause()

    }
  }

  const toggleMute = () => {
    if (!audioRef.current.src) {
      return
    }

    if (audioRef.current?.volume === 0) {
      audioRef.current.volume = 1
      setVolume(1)
    }
    else if (audioRef.current?.volume !== 0) {
      audioRef.current.volume = 0
      setVolume(0)
    }

  }



  const startTimer = () => {
    clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        onPlayNext()
      } else {
        setProgress(audioRef.current.currentTime)
      }
    }, 1000)
  }




  useEffect(() => {
    if (audioRef.current.src) {
      if (isPlaying) {
        audioRef.current.play();
        startTimer();
      } else {
        clearInterval(intervalRef.current);
        audioRef.current.pause();
      }
    } else {
      if (isPlaying) {
        audioRef.current = new Audio(songUrl);
        audioRef.current.play();
        startTimer();
      } else {
        clearInterval(intervalRef.current);
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(songUrl);
    setProgress(audioRef.current.currentTime);
    onPlay()
  }, [songUrl]);


  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);






  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <SearchItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      <div
        className="
            flex 
            md:hidden 
            col-auto 
            w-full 
            justify-end 
            items-center
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

      <div
        className="
              hidden
              h-full
              md:flex 
              flex-col
              justify-start 
              items-center 
              w-full 
              gap-3
              max-w-[722px]
             
             
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
            onChange={(value) => { handleProgressChange(value) }}

          />
           {calculateTime(duration)}

        </div>
      </div>
      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={34}
          />
          <VolumeSlider
            value={volume}
            onChange={(value) => {
              handleVolumeChange(value)
            }}
          />
        </div>
      </div>

    </div>
  );
}

export default PlayerContent;


