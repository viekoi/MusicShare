import { useSupabaseClient } from "@supabase/auth-helpers-react";



const useLoadImage = (songPath:string) => {
  const supabaseClient = useSupabaseClient();
  
  if (!songPath) {
    return null;
  }

  const { data: imageData } = supabaseClient
    .storage
    .from('images')
    .getPublicUrl(songPath);

  return imageData.publicUrl;
};

export default useLoadImage;