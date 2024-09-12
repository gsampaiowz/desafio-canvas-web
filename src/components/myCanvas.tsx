"use client";
import { Layer, Stage } from "react-konva";
import React, { ReactNode } from "react";
import { Html } from "react-konva-utils";

interface CanvasProps {
  children: ReactNode;
}

const Canvas: React.FC<CanvasProps> = ({ children }) => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Html>{children}</Html>
      </Layer>
    </Stage>
  );
};

export default Canvas;
