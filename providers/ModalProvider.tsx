"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/modals/AuthModal";
import UploadModal from "@/components/modals/UploadModal";
import SearchModal from "@/components/modals/SearchModal";
import DeleteModal from "@/components/modals/DeleteModal";
import MobilePlayerModal from "@/components/modals/mobilePlayerModal";
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
    <MobilePlayerModal/>
    <DeleteModal/>
    <SearchModal/>
    <AuthModal/>
    <UploadModal/>
    </>
  );
}

export default ModalProvider;