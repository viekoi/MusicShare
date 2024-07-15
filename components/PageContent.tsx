"use client";
import React from "react";

import { Song } from "@/types";
import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import usePlayer from "@/hooks/usePlayer";

interface PageContentProps {
  songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);
  const player = usePlayer();
  return (
    <div className="list xl:gap-0  md:gap-2 gap-3 overflow-hidden">
      {songs.map((song) => {
        return (
          <SongItem
            onClick={(id: string) => onPlay(id)}
            active={song.id === player.activeId}
            key={song.id}
            data={song}
          />
        );
      })}
    </div>
  );
};

export default PageContent;
