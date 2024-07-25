"use client";

import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ModalProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;

  [key: string]: any;
}
import { cn } from "@/lib/utils";
import { DialogOverlay } from "@radix-ui/react-dialog";

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  description,
  children,
  onClose,
  className,
  ...rest
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <Dialog open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <DialogOverlay>
        <DialogContent
          className={cn(
            `
        overflow-y-auto
        fixed 
        border 
        top-[50%] 
        left-[50%] 
        max-h-full 
        h-full 
        md:h-auto 
        md:max-h-[85vh] 
        w-full 
        md:w-[90vw] 
        md:max-w-[450px] 
        translate-x-[-50%]
        translate-y-[-50%]
        rounded-md 
        p-[25px] 
        focus:outline-none
        z-50
        `,
            className
          )}
          {...rest}
        >
          {title && (
            <DialogTitle
              className="
              text-xl 
              text-center 
              font-bold 
              pb-4
              border-b-[1px]
              border-solid
              "
              data-cy="modalTitle"
            >
              {title}
            </DialogTitle>
          )}
          {description && (
            <DialogDescription
              className="
        mb-5 
        text-sm 
        leading-normal 
        text-center
      "
            >
              {description}
            </DialogDescription>
          )}

          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default Modal;
