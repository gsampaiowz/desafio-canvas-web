import { Trash2 } from "lucide-react";
import React, { ReactNode } from "react";
import { Group, Layer, Stage, Text } from "react-konva";

interface PageItemProps {
  text: string;
}

export const PageItem = ({ text }: PageItemProps) => {
  return (
    <Stage draggable height={50} width={100}>
      <Layer className="flex-1 w-48 rounded bg-gray-400 flex justify-between items-center px-4 py-6 font-bold">
        <Text text={text} fontSize={15} x={0} />
        <Trash2 className="bg-gray-500 fill-gray-400 text-gray-600 mb-2 self-end p-1 rounded size-7 cursor-pointer" />
      </Layer>
    </Stage>
  );
};
