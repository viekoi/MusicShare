"use client";
import React from "react";
import { DataTable } from "./Table";
import { songColumns } from "./tables/song/columns";

import useDeleteSongsByIds from "@/hooks/useDeleteSongsByIds";
import { Song } from "@/types";


interface TableContentProps {
  songs: Song[];
}

const TableContent: React.FC<TableContentProps> = ({ songs }) => {
  const {
    deleteSongsByIds,
    isLoading: isDeleting,
    data,
  } = useDeleteSongsByIds();
  
  return (
    <div className="px-4">
      <DataTable
        columns={songColumns}
        data={songs}
        searchKey="title"
        onDelete={deleteSongsByIds}
        loading={isDeleting}
      />
    </div>
  );
};

export default TableContent;
