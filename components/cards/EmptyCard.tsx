"use client";

import { useUser } from "@/hooks/useUser";
import { Button } from "../ui/button";
import useAuthModal from "@/hooks/useAuthModal";

const EmptyCard = () => {
  const { user } = useUser();
  const authModal = useAuthModal();
  return (
    <div className="w-full h-full flex items-center justify-center flex-col flex-1 gap-y-3 text-muted-foreground">
      <h1>Chưa có bài hát nào được thêm vào</h1>
      <h3>Hãy là người đầu tiền </h3>
      {!user && (
        <Button className="text-white w-fit " onClick={authModal.onOpen}>
          Đăng nhập
        </Button>
      )}
    </div>
  );
};

export default EmptyCard;
