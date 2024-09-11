import { Group, Layer, Rect, Shape, Stage, Text } from "react-konva";
import { CanvasPage } from "./canvasPage";
import { Button } from "./ui/button";

export default function MyCanvas() {
  return (
    <Stage
      height={window.innerHeight}
      width={window.innerWidth}
      className="flex flex-col gap-12 justify-center items-center absolute"
    >
    </Stage>
  );
}
