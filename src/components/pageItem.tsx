import { Trash2 } from "lucide-react";
import React, { ReactNode } from "react";
import { Group, Layer, Stage, Text } from "react-konva";

interface PageItemProps {
  text: string;
}

export const PageItem = ({ text }: PageItemProps) => {
  return (
      <div className="flex-1 flex justify-between items-center py-6 bg-gray-400 gap-4 rounded px-3">
        <p>{text}</p>
        <Trash2 className="bg-gray-500 fill-gray-400 text-gray-600 mb-2 self-end p-1 rounded size-7 cursor-pointer" />
      </div>
  );
};
