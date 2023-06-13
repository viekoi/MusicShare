import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { Song } from "@/types";


const useGetSongsByUserId = (id?:string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [songs, setSongs] = useState<Song[]>([]);
  const { supabaseClient} = useSessionContext();


 


  const fetchSong = async ()=> {
    if(!id){
      return
    }
    const { data, error } = await  supabaseClient
    .from('songs')
    .select('*')
    .eq('user_id',id)
    .order('created_at', { ascending: false })



    if (error) {
      setIsLoading(false);
      return toast.error(error.message);
    }
    
    setSongs(data as Song[]);
    setIsLoading(false);
  }


  useEffect(() => {

    setIsLoading(true);
    fetchSong();
  }, [supabaseClient,id]);

  return useMemo(() => ({
    isLoading,
    songs
  }), [isLoading, songs]);
};

export default useGetSongsByUserId;