"use client";

import React from "react";

import useUploadModal from "@/hooks/useUploadModal";

import Modal from "./Modal";

import UploadSongForm from "../forms/song/UploadSongForm";

const UploadModal = () => {
  const uploadModal = useUploadModal();

  return (
    <Modal
      title="Chia sẽ bài hát yêu thích"
      description=""
      isOpen={uploadModal.isOpen}
      onClose={uploadModal.onClose}
      data-cy="uploadSongModal"
    >
      <UploadSongForm />
    </Modal>
  );
};

export default UploadModal;
