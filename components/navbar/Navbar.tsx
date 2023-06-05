"use client";
import React from "react";
import { FaUserAlt } from "react-icons/fa";

import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import Button from "../Button";
import Dropdown from '../Dropdown'

const Navbar = () => {
  const authModal = useAuthModal();

  const { user } = useUser();


  return (
    <>
      {user ? (
        <>
          <div className="w-full z-[50]">
            <div className=" mx-auto max-w-[1280px] px-2">
              <div className="flex justify-end h-[80px] items-center gap-1">
               <Button className="text-white p-2 text-[10px] sm:text-[15px]  bg-gray-400 ">
                  <FaUserAlt />
               </Button>
               <Dropdown/>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="fixed w-full top-0 bg-slate-600 z-[50]">
          <div className=" mx-auto max-w-[1280px] px-2">
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
