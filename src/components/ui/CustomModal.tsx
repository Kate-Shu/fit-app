'use client'

import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { ReactNode } from "react";

type CustomModalTypes = {
  isOpen: boolean,
  onClose: () => void,
  size?: 'xs' | 'sm' | 'lg',
  title: string,
  children: ReactNode
}
const CustomModal: React.FC<CustomModalTypes> = ({ isOpen, onClose, size, title, children }) => {
  return (
    <Modal
      classNames={{
        base: 'border border-border rounded-2xl bg-bg-secondary/95 text-text-main',
        body: 'text-text-main',
        closeButton:
          "!text-text-light hover:!text-text-light focus:outline-none" +
          "[&>svg]:!text-text-light hover:[&>svg]:!text-text-light" +
          "active:!opacity-100 hover:!bg-transparent cursor-pointer",
      }}
      isOpen={isOpen} onClose={onClose} size={size} >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal >
  );
}


export default CustomModal;