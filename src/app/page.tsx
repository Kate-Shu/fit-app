'use client'

import Chat from "@/components/mod/Chat";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { useState } from "react";


const Home = () => {
  const [openOverlay, setOpenOverlay] = useState<boolean>(false)
  return (
    <main className="grid flex-grow grid-cols-2 h-full min-h-full z-0">
      <section className="h-full flex flex-col pt-7 z-0">
        <p className="whitespace-nowrap ml-5 sm:ml-10 md:ml-20 lg:ml-30 xl:ml-40 mb-3 sm:mb-5 text-text-main font-sans font-bold leading-tight text-[clamp(1.5rem,5vw,3.25rem)] sm:text-[clamp(2rem,5vw,3.5rem)] lg:text-[3rem]">Your personal</p>
        <p className="ml-10 sm:ml-20 md:ml-30 lg:ml-40 xl:ml-50 mb-4 sm:mb-6 md:mb-9 lg:mb-11 xl:mb-15 text-text-main font-sans font-bold leading-tight text-[clamp(1.5rem,5vw,3.25rem)] sm:text-[clamp(2rem,5vw,3.5rem)] lg:text-[3rem] whitespace-nowrap">Fitness Coach</p>
        <Button variant='primary' className='ml-15 sm:ml-30 md:ml-40 lg:ml-50 xl:ml-60 mb-4 sm:mb-6 md:mb-9 lg:mb-11 xl:mb-15 gradient-frst'>Workouts</Button>
        <Button variant='primary' className='ml-20 sm:ml-40 md:ml-50 lg:ml-60 xl:ml-70 mb-4 sm:mb-6 md:mb-9 lg:mb-11 xl:mb-15 gradient-snd'>Dance</Button>
        <Button variant='primary' onClick={() => setOpenOverlay(true)} className='ml-25 sm:ml-50 md:ml-60 lg:ml-70 xl:ml-80 gradient-thrd'>AI assistant</Button>
      </section>
      <section className="h-full min-h-full flex justify-center items-center">
        {/* need fallback for Image? */}
        <Image src='/main-no-bg.png' alt='main image' width={812} height={1490} sizes="100vh" className="w-auto max-h-full h-full object-contain mb-17" >
        </Image>
      </section>
      <Chat isOpen={openOverlay} onClose={() => setOpenOverlay(false)} />
    </main >
  );
}
export default Home;