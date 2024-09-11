"use client";
import { CanvasPage } from "@/components/canvasPage";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const MyCanvas = dynamic(() => import("../components/myCanvas"), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <MyCanvas/>
        
         <div className="flex gap-20">
          <CanvasPage />
          <CanvasPage />
          <CanvasPage />
        </div>
        <div className="py-2 px-64 bg-gray-200 border border-gray-400 rounded-lg absolute bottom-4 left-1/2 -translate-x-1/2">
          <Button className="py-6 px-12 bg-gray-500 hover:bg-gray-400">
            + Nova página
          </Button>
        </div> 
    </main>
  );
}
