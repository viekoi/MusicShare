"use client";

import { useForm } from "react-hook-form";
import { EditSongFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
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
import { Song } from "@/types";
import useEditModal from "@/hooks/useEditModal";

interface EditSongFormProps {
  defaultValues: Song;
}

const EditSongForm: React.FC<EditSongFormProps> = ({ defaultValues }) => {
  const editModal = useEditModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof EditSongFormSchema>>({
    resolver: zodResolver(EditSongFormSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof EditSongFormSchema>) => {
    try {
      setIsLoading(true);
      if (!user) {
        toast.error("Người dùng chưa đăng nhập");
        return;
      }
      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .update({
          title: values.title,
          author: values.author,
        });

      if (supabaseError) {
        return toast.error(supabaseError.message);
      }
    } catch (error) {
      toast.error("Đã có lỗi");
    } finally {
      router.refresh();
      setIsLoading(false);
      toast.success("Đã cập nhật bài hát");
      form.reset();
      editModal.onClose();
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
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
                <Input placeholder="Nhập tên bài hát" {...field} />
              </FormControl>
              <FormMessage />
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
                <Input placeholder="Nhập tên tác giả" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="text-white" disabled={isLoading} type="submit">
          {isLoading ? `Đang cập nhật...` : `Cập nhật`}
        </Button>
      </form>
    </Form>
  );
};

export default EditSongForm;
