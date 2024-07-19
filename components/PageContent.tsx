"use client";
import React, { useEffect } from "react";

import { Song } from "@/types";
import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import usePlayer from "@/hooks/usePlayer";
import EmptyCard from "./cards/EmptyCard";
import MediaItem from "./MediaItem";

interface PageContentProps {
  songs: Song[];
  isStarting?: boolean;
}

const PageContent: React.FC<PageContentProps> = ({ songs, isStarting }) => {
  const onPlay = useOnPlay(songs);
  const player = usePlayer();

  useEffect(() => {
    if (isStarting && songs[0]) {
      onPlay(songs[0].id);
    }
  }, [isStarting]);

  return (
    <div className="list xl:gap-0 md:gap-2 gap-3 overflow-hidden flex-1">
      {songs.length ? (
        songs.map((song) => {
          return (
            <div key={song.id} className="w-full">
              <SongItem
                className="lg:block hidden"
                onClick={() => onPlay(song.id)}
                active={song.id === player.activeId}
                data={song}
              />
              <MediaItem
                className="lg:hidden"
                onClick={() => onPlay(song.id)}
                data={song}
              />
            </div>
          );
        })
      ) : (
        <EmptyCard />
      )}
    </div>
  );
};

export default PageContent;
