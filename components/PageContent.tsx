'use client'
import React from 'react'
import { MdShuffle } from 'react-icons/md'
import { BiRepeat } from 'react-icons/bi'
import { Song } from '@/types'
import SongItem from '@/components/SongItem'
import useOnPlay from "@/hooks/useOnPlay";
import usePlayer from '@/hooks/usePlayer'
import Button from './Button'

interface PageContentProps{
    songs:Song[] 
}


const PageContent:React.FC<PageContentProps> = ({songs}) => {
    const onPlay = useOnPlay(songs);
    const player = usePlayer()
  return (
    <div className="list xl:gap-0  md:gap-2 gap-3 overflow-hidden">
      <div className=" flex items-center gap-2 mt-5 mb-1">
        <Button onClick={()=>{player.setIsRepeated(player.isRepeated)}}>
          <BiRepeat size={20} className={player.isRepeated ?`text-[#22c55e]`:`text-gray-400`} />
        </Button>
        <Button onClick={()=>{player.setIsRandom(player.isRandom)}}>
         <MdShuffle size={20}className={player.isRandom ?`text-[#22c55e]`:`text-gray-400`}  />
        </Button>
      </div>
      {songs.map((song) => {
        return (
          <SongItem onClick={(id: string) => onPlay(id)} active={song.id === player.activeId}  key={song.id} data={song} />
        )
      })}

    </div>
  )
}

export default PageContent
