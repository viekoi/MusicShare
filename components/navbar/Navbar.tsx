"use client";
import React from "react";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { BiLeftArrow, BiRepeat } from "react-icons/bi";
import { IoTrashBin } from "react-icons/io5";
import { useRouter, usePathname } from "next/navigation";

import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import useSearchModal from "@/hooks/useSearchModal";
import useUploadModal from "@/hooks/useUploadModal";
import useDeleteModal from "@/hooks/useDeleteModal";
import Button from "../Button";
import Dropdown from "../Dropdown";
import { IoMdShuffle } from "react-icons/io";
import usePlayer from "@/hooks/usePlayer";

const Navbar = () => {
  const player = usePlayer();
  const router = useRouter();
  const pathName = usePathname();

  const authModal = useAuthModal();
  const searchModal = useSearchModal();
  const uploadModal = useUploadModal();
  const deleteModal = useDeleteModal();
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <div className="h-[80px]"></div>;
  }

  return (
    <>
      {user ? (
        <>
          <div className="w-full z-[50]">
            <div className=" navbar px-4">
              <div className="flex justify-between  h-[80px] items-center gap-2">
                <div className=" flex gap-2 items-center  ">
                  {pathName !== "/" && (
                    <Button
                      onClick={() => router.push("/")}
                      className="flex gap-1 items-center"
                    >
                      <BiLeftArrow size={20} className="text-gray-400" />{" "}
                      <span className="md:text-[16px] text-[12px] text-gray-400">
                        Trở về
                      </span>
                    </Button>
                  )}
                </div>

                <div className=" flex gap-2 items-center  ">
                  <Button
                    onClick={() => {
                      player.setIsRepeated(player.isRepeated);
                    }}
                  >
                    <BiRepeat
                      size={20}
                      className={
                        player.isRepeated ? `text-[#22c55e]` : `text-gray-400`
                      }
                    />
                  </Button>
                  <Button
                    onClick={() => {
                      player.setIsRandom(player.isRandom);
                    }}
                  >
                    <IoMdShuffle
                      size={20}
                      className={
                        player.isRandom ? `text-[#22c55e]` : `text-gray-400`
                      }
                    />
                  </Button>
                  <Button onClick={uploadModal.onOpen}>
                    <AiOutlinePlus size={20} className="text-gray-400" />
                  </Button>
                  {pathName.includes("/uploaded") && (
                    <Button onClick={deleteModal.onOpen}>
                      <IoTrashBin size={20} className="text-gray-400" />
                    </Button>
                  )}

                  <Button onClick={searchModal.onOpen}>
                    <AiOutlineSearch size={20} className="text-gray-400" />
                  </Button>
                  <Dropdown />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="fixed w-full top-0 bg-slate-600 z-[50]">
          <div className=" navbar px-4">
            <div className="flex sm:flex-row flex-col items-center justify-center sm:justify-between gap-1 sm:gap-0  w-full h-[80px]">
              <h1 className="sm:text-[30px] font-bold text-[15px] ">
                Chào mừng đến với Music share
              </h1>
              <Button
                className="text-white px-2 py-1 text-[10px] sm:text-[15px]  bg-gray-400 "
                onClick={authModal.onOpen}
              >
                Đăng nhập
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
