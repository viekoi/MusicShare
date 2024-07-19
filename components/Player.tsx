"use client";

import usePlayer from "@/hooks/usePlayer";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import useGetSongById from "@/hooks/useGetSonngById";

import PlayerContent from "./PlayerContent";
import StaticPlayerContent from "./StaticPlayerContent";

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);

  const songUrl = useLoadSongUrl(song!);
  return (
    <div
      className="  fixed 
        bottom-0 
        bg-black 
        w-full
        pr-[var(--removed-body-scroll-bar-size)]"
    >
      <div
        className="
        py-2 
        h-[80px] 
        z-[50]
        w-full
        px-4
      "
      >
        {!song || !songUrl || !player.activeId ? (
          <StaticPlayerContent />
        ) : (
          <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
        )}
      </div>
    </div>
  );
};

export default Player;
