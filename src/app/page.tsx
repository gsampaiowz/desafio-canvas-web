"use client";
import dynamic from "next/dynamic";
import { CanvasPage } from "@/components/canvasPage";
import { Button } from "@/components/ui/button";
import InfiniteViewer from "react-infinite-viewer";

const Canvas = dynamic(() => import("../components/myCanvas"), {
  ssr: false,
});

const HomePage: React.FC = () => {
  return (
    <InfiniteViewer
      className="viewer size-full"
    >
      <div className="viewport">
        <main className="flex flex-col gap-24 justify-center items-center h-screen w-screen">
          {/* <Canvas> */}
          <div className="flex gap-20">
            <CanvasPage />
            <CanvasPage />
            <CanvasPage />
          </div>
          <div className="py-2 px-64 bg-gray-200 border border-gray-400 rounded-lg">
            <Button className="py-6 px-12 bg-gray-500">+ Nova página</Button>
          </div>
          {/* </Canvas> */}
        </main>
      </div>
    </InfiniteViewer>
  );
};

export default HomePage;
