import { CanvasPage } from "@/components/canvasPage";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col gap-24 justify-center items-center h-screen">
      <div className="flex gap-20">
        <CanvasPage/> 
        <CanvasPage/> 
        <CanvasPage/> 
      </div>
      <div className="py-2 px-64 bg-gray-200 border border-gray-400 rounded-lg">
        <Button className="py-6 px-12 bg-gray-500">+ Nova página</Button>
      </div>
    </main>
  );
}
