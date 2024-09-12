"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { CanvasPage } from "@/components/canvasPage";
import { Button } from "@/components/ui/button";

const Canvas = dynamic(() => import("../components/myCanvas"), {
  ssr: false,
});

const HomePage: React.FC = () => {
  return (
    <Canvas>
      <main className="flex flex-col gap-24 justify-center items-center h-screen w-screen">
        <div className="flex gap-20">
          <CanvasPage />
          <CanvasPage />
          <CanvasPage />
        </div>
        <div className="py-2 px-64 bg-gray-200 border border-gray-400 rounded-lg">
          <Button className="py-6 px-12 bg-gray-500">+ Nova página</Button>
        </div>
      </main>
    </Canvas>
  );
};

export default HomePage;
