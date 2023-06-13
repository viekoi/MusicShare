"use client";
import React, { useState} from "react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { toast } from "react-hot-toast";
import { Song } from "@/types";


import useSearchModal from "@/hooks/useSearchModal";
import useDebounce from "@/hooks/useDebounce";
import Input from "../inputs/Input";
import Modal from "./Modal";
import MediaItem from "../MediaItem";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useGetSongsByTitle from "@/hooks/useGetSongsByTitle";

const SearchModal = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);
  const { songs } = useGetSongsByTitle(debouncedValue);





  const searchModal = useSearchModal();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      title: "",
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      searchModal.onClose();
    }
  };


  const handleClickSong = (song: Song) => {
    setIsLoading(true);
    router.push(`search/${song.id}`)
    searchModal.onClose()
    setValue("")
    setIsLoading(false);
    reset();
  }



  const onSubmit: SubmitHandler<FieldValues> = async (values) => {

    try {
      setIsLoading(true);


      const query = {
        title: value,
      };

      const url = qs.stringifyUrl({
        url: "/search",
        query,
      });

      router.push(url);
      setValue("")
      setIsLoading(false);
      reset();
      searchModal.onClose();
    } catch (error) {
      toast.error("Đã có lỗi");
    }
  };





  return (
    <Modal
      isOpen={searchModal.isOpen}
      title={"Tìm một bài hát"}
      onChange={onChange}
      description=""
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="title"
          disabled={isLoading}
          {...register("title")}
          placeholder="Tìm một bài hát"
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
      {
        <div className="mt-2">
          {songs.map((song) => {
            return <MediaItem  key={song.id} data={song} onClick={() => {
              handleClickSong(song)
            }} />;
          })}
        </div>
      }
    </Modal>
  );
};

export default SearchModal;
