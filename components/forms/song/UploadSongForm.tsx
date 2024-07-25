"use client";
import uniqid from "uniqid";
import { useForm } from "react-hook-form";
import { UploadSongFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import useUploadModal from "@/hooks/useUploadModal";
import * as z from "zod";
import { useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toSlug } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const UploadSongForm = () => {
  const uploadModal = useUploadModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof UploadSongFormSchema>>({
    resolver: zodResolver(UploadSongFormSchema),
    defaultValues: {
      title: "",
      author: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UploadSongFormSchema>) => {
    try {
      setIsLoading(true);

      const imageFile = values.image;
      const songFile = values.file;

      if (!imageFile || !songFile || !user) {
        return toast.error("Tạo bài hát không thành công");
      }

      const uniqueID = uniqid();

      // Upload song
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${toSlug(values.title)}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("Tạo bài hát không thành công");
      }

      // Upload image
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${toSlug(values.title)}-${uniqueID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (imageError) {
        setIsLoading(false);
        return toast.error("Đăng ảnh không thành công");
      }

      // Create record
      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        });

      if (supabaseError) {
        await supabaseClient.storage
          .from("songs")
          .remove([`song-${toSlug(values.title)}-${uniqueID}`]);
        await supabaseClient.storage
          .from("images")
          .remove([`image-${toSlug(values.title)}-${uniqueID}`]);
        return toast.error(supabaseError.message);
      }

      toast.success("Bài hát được tạo thành công");
      form.reset();
    } catch (error) {
      toast.error("Đã có lỗi");
    } finally {
      router.refresh();
      setIsLoading(false);
      uploadModal.onClose();
    }
  };

  return (
    <Form {...form}>
      <form
        data-cy="uploadSongForm"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên bài hát</FormLabel>
              <FormControl>
                <Input
                  data-cy="titleInput"
                  placeholder="Nhập tên bài hát"
                  {...field}
                />
              </FormControl>
              <FormMessage data-cy="titleInputMessage" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên tác giả</FormLabel>
              <FormControl>
                <Input
                  data-cy="authorInput"
                  placeholder="Nhập tên tác giả"
                  {...field}
                />
              </FormControl>
              <FormMessage data-cy="authorInputMessage" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Tệp MP3</FormLabel>
              <FormControl>
                <Input
                  data-cy="mp3FileInput"
                  className=" file:hidden text-muted-foreground "
                  {...fieldProps}
                  type="file"
                  accept=".mp3"
                  onChange={(event) => {
                    onChange(event.target.files && event.target.files[0]);
                  }}
                />
              </FormControl>
              <FormMessage data-cy="mp3FileInputMessage" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Tệp ảnh</FormLabel>
              <FormControl>
                <Input
                  data-cy="imageInput"
                  className="file:hidden text-muted-foreground"
                  {...fieldProps}
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    onChange(event.target.files && event.target.files[0])
                  }
                />
              </FormControl>
              <FormMessage data-cy="imageInputMessage" />
            </FormItem>
          )}
        />
        <Button
          data-cy="submitButton"
          className="text-white"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? `Đang tạo...` : `Tạo ngay`}
        </Button>
      </form>
    </Form>
  );
};

export default UploadSongForm;
