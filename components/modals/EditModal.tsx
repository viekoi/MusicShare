"use client";

import React from "react";

import Modal from "./Modal";

import useEditModal from "@/hooks/useEditModal";

import EditSongForm from "../forms/song/EditSongForm";

const EditModal = () => {
  const editModal = useEditModal();
  if (!editModal.data) return null;
  return (
    <Modal
      title="Chỉnh sửa thông tin bài hát"
      description=""
      isOpen={editModal.isOpen}
      onClose={editModal.onClose}
    >
      <EditSongForm defaultValues={editModal.data} />
    </Modal>
  );
};

export default EditModal;
