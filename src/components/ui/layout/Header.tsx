'use client'
import LoginModal from "@/components/mod/modals/LoginModal";
import RegistrationModal from "@/components/mod/modals/RegistrationModal";


import { useState } from "react";
import Button from "../Button";
// import { signOutFunc } from "@/app/actions/sign-out";
import { useAuthStore } from "@/store/auth.store";
import { signOut } from "next-auth/react";

const Header = () => {

  const [isRegistrationOpen, setRegistrationOpen] = useState<boolean>(false)
  const [isLoginOpen, setLoginOpen] = useState<boolean>(false)
  const { isAuth, session, status, setAuthState } = useAuthStore()
  const userName = session?.user?.email?.slice(0, session?.user?.email?.indexOf("@"))

  const handleSignOut = async () => {
    try {
      signOut({ redirect: false })
    } catch (error) {
      console.log('error sign out', error)
    }
    setAuthState('unauthenticated', null)
  }

  console.log('session', session)
  console.log('status', status)
  console.log('isAuth', isAuth)

  return (
    <header className="flex-shrink-0 sticky top-0 z-10 text-text-light h-max-15">
      <div className="px-9 py-4 flex justify-between items-center font-serif">
        <div className="flex items-center gap-4 uppercase">
          {/* <Link href={"#"}>Home</Link>
          <Link href={"#"} className="whitespace-nowrap">About us</Link>
          <Link href={"#"}>Programs</Link>
          <Link href={"#"}>Features</Link> */}
        </div>

        <div className="flex items-center gap-4">
          {isAuth && <p>Hello, {userName}!</p>}
          {status === 'loading' ? <p>Loading...</p> : !isAuth ? (
            <>
              <Button className='ml-2' variant="text" onClick={() => setRegistrationOpen(true)}>Registration</Button>
              <Button variant="text" onClick={() => setLoginOpen(true)}>Login</Button>
            </>
          ) : <Button variant="text" onClick={handleSignOut}>Logout</Button>}
        </div>
      </div>
      <RegistrationModal onClose={() => setRegistrationOpen(false)} isOpen={isRegistrationOpen} />
      <LoginModal onClose={() => setLoginOpen(false)} isOpen={isLoginOpen} />
    </header>
  )
}
export default Header;