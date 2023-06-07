"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/modals/AuthModal";
import UploadModal from "@/components/modals/UploadModal";
import SearchModal from "@/components/modals/SearchModal";
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
    <SearchModal/>
    <AuthModal/>
    <UploadModal/>
    </>
  );
}

export default ModalProvider;