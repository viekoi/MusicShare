'use client'
import Modal from './Modal'
import React from 'react'
import { useSessionContext } from "@supabase/auth-helpers-react";
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import MediaItem from '../MediaItem'
import useDeleteModal from '@/hooks/useDeleteModal'
import useGetSongsByUserId from '@/hooks/useGetSongsByUserId'



const DeleteModal = () => {
  const deleteModal = useDeleteModal()
  const { supabaseClient,session} = useSessionContext();
  const {songs} = useGetSongsByUserId(session?.user.id)
  const router = useRouter()
  





  const onChange = (open: boolean) => {
    if (!open) {
      deleteModal.onClose();
    }
  };

 
  const handleDelete = async (id:string)=>{
    console.log(id)
    const {error} = await supabaseClient
    .from('songs')
    .delete()
    .eq('id',id)

    if (error) {
      return toast.error(error.message);
    }else{
      deleteModal.onClose()
      router.refresh()
      return toast.success('Xóa thành công');
      
    }
    
  }
 




  return (
    <Modal isOpen={deleteModal.isOpen} title={'Xóa bài hát'} description='' onChange={onChange}>
      {songs.map((song)=>{
        return(
          <MediaItem key={song.id} data={song} onClick={()=>handleDelete(song.id)} />
        )
      })}
    </Modal>
  )
}

export default DeleteModal
