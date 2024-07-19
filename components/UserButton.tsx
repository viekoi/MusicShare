import React from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { toast } from "react-hot-toast";

import { LogOut, Music, User } from "lucide-react";
import { Button } from "./ui/button";

const UserButton = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    router.push("/");

    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"link"}>
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Button
            onClick={() => router.push(`/uploaded`)}
            variant={"ghost"}
            className="flex w-full items-center justify-start px-2 gap-x-3"
          >
            <Music size={20} />
            <span>Nhạc đã đăng</span>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            onClick={handleLogout}
            variant={"ghost"}
            className="flex w-full items-center justify-start px-2 gap-x-3"
          >
            <LogOut size={20} />
            <span>Đăng xuất</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
