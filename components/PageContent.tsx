'use client'
import React from 'react'
import { MdShuffle } from 'react-icons/md'
import { BiRepeat } from 'react-icons/bi'
import { IoVolumeMedium } from 'react-icons/io5'
import { Song } from '@/types'
import SongItem from '@/components/SongItem'
import useOnPlay from "@/hooks/useOnPlay";
import usePlayer from '@/hooks/usePlayer'

interface PageContentProps{
    songs:Song[] 
}


const PageContent:React.FC<PageContentProps> = ({songs}) => {
    const onPlay = useOnPlay(songs);
    const player = usePlayer()
  return (
    <div className="list xl:gap-0 lg:gap-1 md:gap-2 gap-3 overflow-hidden">
      <div className=" flex items-center gap-2 mb-5 pl-1">
        <BiRepeat size={20} className='text-gray-400' />
        <MdShuffle size={20} className='text-gray-400' />
        <IoVolumeMedium size={20} className='text-gray-400' />
      </div>
      {songs.map((song) => {
        return (
          <SongItem onClick={(id: string) => onPlay(id)} active={song.id === player.activeId}  key={song.id} id={song.id} userId={song.user_id} author={song.author} title={song.title} songPath={song.song_path} imagePath={song.image_path} />
        )
      })}

    </div>
  )
}

export default PageContent
