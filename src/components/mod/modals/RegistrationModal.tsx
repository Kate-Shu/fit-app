'use client'

import CustomModal from "@/components/ui/CustomModal";
import RegistrationForm from "../auth/RegistrationForm";

type RegistrationModalType = {
  isOpen: boolean,
  onClose: () => void
}

const RegistrationModal: React.FC<RegistrationModalType> = ({ isOpen, onClose }) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="Create account">
      <RegistrationForm onClose={onClose} />
    </CustomModal>);
}

export default RegistrationModal;