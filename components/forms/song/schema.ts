import * as z from "zod";

export const UploadSongFormSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Hãy nhập ít nhất 5 ký tự" })
    .max(20, { message: "Hãy nhập từ 5 đến 20 ký tự" }),
  author: z
    .string()
    .min(5, { message: "Hãy nhập ít nhất 5 ký tự" })
    .max(40, { message: "Hãy nhập từ 5 đến 20 ký tự" }),
  file: z
    .any()
    .nullable()
    .refine((data) => data && data.type === "audio/mpeg", {
      message: "Tệp phải thuộc định dạng mp3",
    })
    .refine((data) => data && data.size <= 10 * 1024 * 1024, {
      message: "Tệp phải bé hơn 10mb",
    }),
  image: z
    .any()
    .nullable()
    .refine(
      (data) => {
        const validTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
        ];
        return data && validTypes.includes(data.type);
      },
      {
        message: "Ảnh phải thuộc định dạng JPEG, PNG, GIF, or WebP format",
      }
    )
    .refine((data) => data && data.size <= 5 * 1024 * 1024, {
      message: "Ảnh phải bé hơn 10mb",
    }),
});

export const EditSongFormSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Hãy nhập ít nhất 5 ký tự" })
    .max(20, { message: "Hãy nhập từ 5 đến 20 ký tự" }),
  author: z
    .string()
    .min(5, { message: "Hãy nhập ít nhất 5 ký tự" })
    .max(40, { message: "Hãy nhập từ 5 đến 20 ký tự" }),
});
