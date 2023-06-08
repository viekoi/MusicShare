

import { MdShuffle } from 'react-icons/md'
import { BiRepeat } from 'react-icons/bi'
import { IoVolumeMedium } from 'react-icons/io5'


import SongItem from '@/components/SongItem'
import getSongById from '@/actions/server/getSongById'


interface SearchPageBySongIdProps {
    params: { id: string }
  };




const SearchPageBySongId = async ({ params}: SearchPageBySongIdProps) => {
 

  const searchedResult = await getSongById(params.id)
 
  return (
        <div className="list xl:gap-0 lg:gap-1 md:gap-2 gap-3">
      <div className=" flex items-center gap-2 mb-5 pl-1">
        <BiRepeat size={20} className='text-gray-400' />
        <MdShuffle size={20} className='text-gray-400' />
        <IoVolumeMedium size={20} className='text-gray-400' />
      </div>
      
      {searchedResult.map((song) => {
        return (
          <SongItem key={song.id}  id={song.id} userId={song.user_id} author={song.author} title={song.title} songPath={song.song_path} imagePath={song.image_path} />
        )
      })}

    </div>
  )
}

export default SearchPageBySongId