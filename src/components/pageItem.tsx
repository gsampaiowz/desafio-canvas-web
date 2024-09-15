import { useDraggable } from "@dnd-kit/core";
import { Trash2 } from "lucide-react";
import React, { ReactNode } from "react";
import { Group, Layer, Stage, Text } from "react-konva";

interface PageItemProps {
  text: string;
}

export const PageItem = ({ text }: PageItemProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      // ref={setNodeRef}
      // style={style}
      // {...listeners}
      // {...attributes}
      className="flex-1 flex justify-between items-center py-6 bg-gray-400 gap-4 rounded px-3 relative z-50"
    >
      <p>{text}</p>
      <Trash2 className="bg-gray-500 fill-gray-400 text-gray-600 mb-2 self-end p-1 rounded size-7 cursor-pointer" />
    </div>
  );
};
