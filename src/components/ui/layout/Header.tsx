'use client'
import LoginModal from "@/components/mod/modals/LoginModal";
import RegistrationModal from "@/components/mod/modals/RegistrationModal";
// import { Button } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import Button from "../Button";

const Header = () => {

 const [isRegistrationOpen, setRegistrationOpen] = useState<boolean>(false)
 const [isLoginOpen, setLoginOpen] = useState<boolean>(false)
 return (
  <header className="flex-shrink-0 sticky top-0 z-10 text-text-light">
   <div className="px-9 py-4 flex justify-between items-center font-serif uppercase">
    <div className="flex items-center gap-4">
     <Link href={"#"}>Home</Link>
     <Link href={"#"}>About us</Link>
     <Link href={"#"}>Programs</Link>
     <Link href={"#"}>Features</Link>
    </div>
    <div className="flex items-center gap-4">
     <Button className='ml-2' variant="text" onClick={() => setRegistrationOpen(true)}>Registration</Button>
     <Button variant="text" onClick={() => setLoginOpen(true)}>Login</Button>
    </div>
   </div>
   <RegistrationModal onClose={() => setRegistrationOpen(false)} isOpen={isRegistrationOpen} />
   <LoginModal onClose={() => setLoginOpen(false)} isOpen={isLoginOpen} />
  </header>
 )
}
export default Header;