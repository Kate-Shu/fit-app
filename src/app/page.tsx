'use client'

import Chat from "@/components/mod/Chat";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { useState } from "react";


const Home = () => {
  const [openOverlay, setOpenOverlay] = useState<boolean>(false)
  return (
    <main className="relative grid flex-grow md:grid-cols-2 h-full min-h-screen z-0 overflow-hidden md:mt-0">
      {/* Mobile background image */}
      <div className="absolute inset-0 md:hidden flex justify-center bg-gradient-to-b from-black via-black/70 to-black">
        <Image
          src="/main-no-bg.png"
          alt="main image background"
          priority
          sizes="100vw"
          width={812}
          height={1490}
          className="object-contain object-center h-[90vh]"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <section className="h-full flex flex-col pt-7 z-10">
        <p className="whitespace-nowrap ml-15 sm:ml-10 md:ml-20 lg:ml-30 xl:ml-40 mb-3 sm:mb-5 text-text-main font-sans font-bold leading-tight text-[clamp(1.5rem,5vw,3.25rem)] sm:text-[clamp(2rem,5vw,3.5rem)] lg:text-[3rem]">Your personal</p>
        <p className="ml-40 xs:ml-14 sm:ml-20 md:ml-30 lg:ml-40 xl:ml-50 mb-10 sm:mb-6 md:mb-9 lg:mb-11 xl:mb-15 text-text-main font-sans font-bold leading-tight text-[clamp(1.5rem,5vw,3.25rem)] sm:text-[clamp(2rem,5vw,3.5rem)] lg:text-[3rem] whitespace-nowrap">Fitness Coach</p>
        <Button variant='primary' onClick={() => setOpenOverlay(true)} className='ml-15 sm:ml-30 md:ml-40 lg:ml-50 xl:ml-60 mb-10 sm:mb-6 md:mb-9 lg:mb-11 xl:mb-15 gradient-frst'>AI ASSISTANT</Button>
        <Button variant='primary' className='ml-15 sm:ml-40 md:ml-50 lg:ml-60 xl:ml-70 mb-10 sm:mb-6 md:mb-9 lg:mb-11 xl:mb-15 gradient-snd gradient-thrd opacity-50 cursor-not-allowed'>DANCE (Coming soon)</Button>
        <Button variant='primary' className='ml-15 xs:ml-0 sm:ml-50 md:ml-60 lg:ml-70 xl:ml-80 gradient-thrd gradient-thrd opacity-50 cursor-not-allowed'>WORKOUTS (Coming soon)</Button>
      </section>
      <section className="hidden md:flex h-full min-h-full justify-center">
        <Image src='/main-no-bg.png' alt='main image' width={812} height={1490} sizes="100vh" className="w-auto h-[90vh] object-contain mb-17" >
        </Image>
      </section>
      <Chat isOpen={openOverlay} onClose={() => setOpenOverlay(false)} />
    </main >
  );
}
export default Home;
