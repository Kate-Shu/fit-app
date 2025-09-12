'use client'

import CustomModal from "@/components/ui/CustomModal";
import LoginForm from "../auth/LoginForm";

type LoginModalType = {
  isOpen: boolean,
  onClose: () => void
}

const LoginModal: React.FC<LoginModalType> = ({ isOpen, onClose }) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="Authorization">
      <LoginForm onClose={onClose} />
    </CustomModal>);
}

export default LoginModal;