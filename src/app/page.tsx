"use client";
import { CanvasPage } from "@/components/canvasPage";
import { Button } from "@/components/ui/button";
import { DndContext } from "@dnd-kit/core";
import { useRef } from "react";
import InfiniteViewer, { InfiniteViewerProps } from "react-infinite-viewer";

const HomePage: React.FC = () => {
  const viewer = useRef<InfiniteViewerProps>(null);

  return (
    <InfiniteViewer
      // displayVerticalScroll={false}
      // displayHorizontalScroll={false}
      ref={viewer as any}
      className="!w-screen !h-screen"
      useMouseDrag={true}
      useWheelScroll={true}
      useAutoZoom={true}
      zoomRange={[0.1, 10]}
      maxPinchWheel={10}
      onDragStart={(e) => {
        const target = e.inputEvent.target;

        if (target.nodeName === "A") {
          e.stop();
        }
      }}
    >
      {/* <DndContext> */}
          <CanvasPage />
          <CanvasPage />
          <CanvasPage />
      {/* </DndContext> */}

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 py-2 px-64 bg-gray-200 border border-gray-400 rounded-lg">
        <Button className="py-6 px-12 bg-gray-500">+ Nova página</Button>
      </div>
    </InfiniteViewer>
  );
};

export default HomePage;
