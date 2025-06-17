import Button from "@/components/ui/Button";
import Image from "next/image";

const Home = () => {
  return (
    <main className="grid flex-grow grid-cols-2 h-full min-h-full z-0">
      <section className="h-full flex flex-col pt-10 z-0">
        <h1 className="ml-9 text-text-main font-sans text-7xl font-bold">Fitness</h1>
        <h1 className="ml-15 mb-9 text-text-main font-sans text-7xl font-bold">App</h1>
        <Button variant='primary' type="button" gradientDirection="left">Workouts</Button>
        <Button variant='primary' type="button" gradientDirection="bottom">Dance</Button>
        <Button variant='primary' type="button" gradientDirection="right">AI assistant</Button>
      </section>
      <section className="h-full min-h-full flex justify-center items-center">
        {/* need fallback for Image? */}
        <Image src='/main-no-bg.png' alt='main image' width={812} height={1490} priority className="w-auto max-h-full h-full object-contain mb-17">
        </Image>
      </section>
    </main >
  );
}
export default Home;