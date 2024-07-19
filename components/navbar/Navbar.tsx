"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import useSearchModal from "@/hooks/useSearchModal";
import useUploadModal from "@/hooks/useUploadModal";
import Dropdown from "../UserButton";
import { ChevronsLeft, Plus, Search } from "lucide-react";
import { Button } from "../ui/button";

const Navbar = () => {
  const router = useRouter();
  const pathName = usePathname();

  const authModal = useAuthModal();
  const searchModal = useSearchModal();
  const uploadModal = useUploadModal();
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <div className="h-[80px]"></div>;
  }

  return (
    <div className="sticky w-full top-0 z-[50] bg-secondary">
      <div className="w-full z-[50] px-4 flex justify-between  h-[80px] items-center gap-2">
        <div className=" flex gap-2 items-center  ">
          {pathName !== "/" && (
            <Button
              onClick={() => router.push("/")}
              className="flex gap-1 items-center"
            >
              <ChevronsLeft size={20} />
            </Button>
          )}
        </div>

        <div className=" flex gap-2 items-center  ">
          <Button variant={"link"} onClick={searchModal.onOpen}>
            <Search size={20} />
          </Button>
          {user ? (
            <>
              <Button variant={"link"} onClick={uploadModal.onOpen}>
                <Plus size={20} />
              </Button>
              <Dropdown />
            </>
          ) : (
            <Button
              className="text-white w-full lg:w-fit"
              onClick={authModal.onOpen}
            >
              Đăng nhập
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
