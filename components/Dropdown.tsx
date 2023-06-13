import React from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FaUserAlt } from "react-icons/fa";
import { toast } from 'react-hot-toast'
import useUploadModal from "@/hooks/useUploadModal";
import Button from "./Button";

const DropdownMenuDemo = () => {
  const uploadModal = useUploadModal()
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    router.refresh();

    if (error) {
      toast.error(error.message)
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild className=" outline-none">
        <Button className="text-white p-2 text-[10px] sm:text-[15px]  bg-gray-400 " aria-label="Customise options">
          <FaUserAlt />
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          {/* <DropdownMenu.Item
            onClick={()=>{}}
            className=" hover:bg-gray-400  text-[13px] leading-none text-black rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
          >
            Thông tin cá nhân
          </DropdownMenu.Item> */}
          {/* <DropdownMenu.Item
             onClick={uploadModal.onOpen}
            className=" hover:bg-gray-400  text-[13px] leading-none text-black rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
          >
            Thêm một bài nhạc
          </DropdownMenu.Item> */}

          <DropdownMenu.Item
            onClick={()=> router.push(`/uploaded`)}
            className=" hover:bg-gray-400 text-[13px] leading-none text-black rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
          >
            Nhạc của tôi
          </DropdownMenu.Item>


          <DropdownMenu.Item
            onClick={handleLogout}
            className=" hover:bg-gray-400 text-[13px] leading-none text-black rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
          >
            Đăng xuất
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownMenuDemo;
