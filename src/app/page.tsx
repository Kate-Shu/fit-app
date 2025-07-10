'use client'

import AssistantOverlay from "@/components/mod/AssistantOverlay";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { useState } from "react";


const Home = () => {
  const [openOverlay, setOpenOverlay] = useState<boolean>(false)
  return (
    <main className="grid flex-grow grid-cols-2 h-full min-h-full z-0">
      <section className="h-full flex flex-col pt-7 z-0">
        <h1 className="ml-20 mb-7 text-text-main font-sans text-7xl font-bold">Your personal</h1>
        <h1 className="ml-35 mb-13 text-text-main font-sans text-7xl font-bold">Fitness Coach</h1>
        <Button variant='primary' className='ml-50 mb-9 gradient-frst'>Workouts</Button>
        <Button variant='primary' className='ml-65 mb-9 gradient-snd'>Dance</Button>
        <Button variant='primary' onClick={() => setOpenOverlay(true)} className='ml-80 gradient-thrd'>AI assistant</Button>
      </section>
      <section className="h-full min-h-full flex justify-center items-center">
        {/* need fallback for Image? */}
        <Image src='/main-no-bg.png' alt='main image' width={812} height={1490} priority className="w-auto max-h-full h-full object-contain mb-17">
        </Image>
      </section>
      <AssistantOverlay isOpen={openOverlay} onClose={() => setOpenOverlay(false)} />
    </main >
  );
}
export default Home;