"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/modals/AuthModal";
import UploadModal from "@/components/modals/UploadModal";
import SearchModal from "@/components/modals/SearchModal";
import EditModal from "@/components/modals/EditModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SearchModal />
      <AuthModal />
      <UploadModal />
      <EditModal />
    </>
  );
};

export default ModalProvider;
