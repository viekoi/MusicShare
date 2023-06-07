'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import qs from "query-string";
import { Song } from '@/types';

import getSongsByTitle from '@/actions/client/getSongByTitle';
import useSearchModal from '@/hooks/useSearchModal'
import useDebounce from '@/hooks/useDebounce';
import Input from '../inputs/Input';
import Modal from './Modal'


import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
const SearchModal = () => {
  const supabase = createClientComponentClient()
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 500);
  console.log(debouncedValue)
  const [searchSongs, setSearchSongs] = useState<Song[]>([])

  const searchModal = useSearchModal()
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
    }
  });


  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      searchModal.onClose();
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {

  }


 


  const getSearchSongs = async (title: string) => {
    const songs = await getSongsByTitle(title)
    setSearchSongs(songs)
  }


  useEffect(() => {
    getSearchSongs(debouncedValue)


  }, [debouncedValue])



  return (
    <Modal isOpen={searchModal.isOpen} title={'Tìm một bài hát'} onChange={onChange} description=''>
      <form onSubmit={onSubmit} >
        <Input
          id="title"
          disabled={isLoading}
          {...register('title')}
          placeholder='Tìm một bài hát'
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
      {


        <>
          {searchSongs.map((song) => {
            return (
              <p key={song.id} className="">{song.title}</p>
            )
          })}
        </>
      }
    </Modal>
  )
}

export default SearchModal
