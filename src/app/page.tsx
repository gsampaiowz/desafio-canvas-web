"use client";
import { CanvasPage } from "@/components/canvasPage";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRef } from "react";
import InfiniteViewer, { InfiniteViewerProps } from "react-infinite-viewer";
import { Group, Layer, Rect, Stage, Text, Shape } from "react-konva";
import { Html } from "react-konva-utils";

const HomePage: React.FC = () => {
  const viewer = useRef<InfiniteViewerProps>(null);

  requestAnimationFrame(() => {
    viewer.current!.scrollCenter();
  });

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer width={window.innerWidth} height={window.innerHeight}>
        {/* <Html> */}
        {/* <InfiniteViewer
            ref={viewer as any}
            id="viewer"
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
          > */}
        {/* <div className="wrap">
              <main className="flex flex-col gap-12 justify-center items-center h-screen w-screen"> */}
        {/* <Canvas> */}
        {/* <div className="flex gap-20">
                  <CanvasPage />
                  <CanvasPage />
                  <CanvasPage />
                </div>
                <div className="fixed bottom-5 left-1/2 -translate-x-1/2 py-2 px-64 bg-gray-200 border border-gray-400 rounded-lg">
                  <Button className="py-6 px-12 bg-gray-500">
                    + Nova página
                  </Button>
                </div> */}
        <Group draggable>
          <Rect width={200} height={100} fill={"#b3b3b3"} cornerRadius={10} />
          {/* <Text x={30} y={40} text="TESTE" fill={"#fff"} />
          <Group x={140} y={32}> */}
          <Html transform={true}>
            <div className="flex-1 flex justify-between items-center py-6 bg-gray-400 gap-4 rounded px-3">
              <p>teste</p>
              <Trash2 className="bg-gray-500 fill-gray-400 text-gray-600 mb-2 self-end p-1 rounded size-7 cursor-pointer" />
            </div>{" "}
          </Html>
        </Group>
        {/* </Group> */}
        {/* </Canvas> */}
        {/* </main>
            </div> */}
        {/* </InfiniteViewer> */}
        {/* </Html> */}
      </Layer>
    </Stage>
  );
};

export default HomePage;
