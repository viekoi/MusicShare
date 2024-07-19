"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Song } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import useEditModal from "@/hooks/useEditModal";
import React from "react";
import usePlayer from "@/hooks/usePlayer";
import useOnPlay from "@/hooks/useOnPlay";

interface EditButtonProps {
  song: Song;
}

const EditButton: React.FC<EditButtonProps> = ({ song }) => {
  const editModal = useEditModal();
  return (
    <Button
      variant={"ghost"}
      className="flex w-fit items-center justify-start px-2 gap-x-3"
      onClick={() => editModal.onOpen(song)}
    >
      <Edit size={20} />
      <span>Chỉnh sửa</span>
    </Button>
  );
};

interface TitleButtonProps {
  song: Song;
}

const TitleButton: React.FC<TitleButtonProps> = ({ song }) => {
  const onPlay = useOnPlay([song]);
  return (
    <Button onClick={() => onPlay(song.id)} variant={"link"}>
      {song.title}
    </Button>
  );
};

export const songColumns: ColumnDef<Song>[] = [
  {
    id: "Chọn",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row, table }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "title",
    header: "Tên",
    cell: ({ row }) => <TitleButton song={row.original} />,
  },
  {
    accessorKey: "author",
    header: "Tác giả",
  },
  {
    id: "actions",
    cell: ({ row }) => <EditButton song={row.original} />,
  },
];
