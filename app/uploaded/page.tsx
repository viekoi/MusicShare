import SongItem from '@/components/SongItem'
import getSongsByUserId from '@/actions/server/getSongByUserId'


export const revalidate = 0

export default async function Uploaded() {

  const songs = await getSongsByUserId()
  return (
   <div className="list xl:gap-0 lg:gap-1 md:gap-2 gap-3">
      {songs.map((song)=>{
        return(
          <SongItem  id={song.id} userId={song.user_id} author={song.author} title={song.title} songPath={song.song_path} imagePath={song.image_path} />
        )
      })}

   </div>
  )
}
