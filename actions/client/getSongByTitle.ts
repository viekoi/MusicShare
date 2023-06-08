import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";


import { Song } from "@/types";
const getSongsByTitle = async (title: string): Promise<Song[]> => {
  
    const supabase = createClientComponentClient()
    const { data, error } = await supabase
      .from('songs')
      .select('*')
      .ilike('title', `%${title}%`)
      .order('created_at', { ascending: false })
      .limit(6)

    if (error) {
      console.log(error.message);
    }

    return (data as any) || [];
};

export default getSongsByTitle;