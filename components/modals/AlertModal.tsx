"use client";
import Modal from "./Modal";
import React, { useEffect, useState } from "react";
import { useAlertModal } from "@/hooks/useAlertModal";
import { Button } from "../ui/button";

interface AlertModalProps {
  onConfirm: () => void;
  loading: boolean;
}

const AlertModal: React.FC<AlertModalProps> = ({ onConfirm, loading }) => {
  const alertModal = useAlertModal();
  const [isMounted, setIsMounted] = useState(false);

  const handleConfirm = () => {
    onConfirm(), alertModal.onClose();
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      isOpen={alertModal.isOpen}
      title={"Bạn có chắc chứ"}
      description="Hành động của bạn không thể hoàn tác"
      onClose={alertModal.onClose}
      className="max-h-[250px] max-w-[90vw]"
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} onClick={alertModal.onClose}>
          Hủy
        </Button>
        <Button
          disabled={loading}
          variant="destructive"
          onClick={handleConfirm}
        >
          Tiếp tục
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
