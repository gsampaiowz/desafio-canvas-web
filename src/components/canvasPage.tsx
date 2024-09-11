import React from "react";
import { Button } from "./ui/button";
import { PageItem } from "./pageItem";
import { Trash2 } from "lucide-react";
import { Layer, Rect, Stage } from "react-konva";

export const CanvasPage = () => {
  return (
    <div className="flex flex-col">
      <Trash2 className="bg-gray-300 fill-gray-400 text-gray-500 mb-2 self-end p-1 rounded size-7 cursor-pointer" />
      <div className="p-4 flex flex-col gap-4 bg-gray-300">
        <PageItem text="teste" />
        <PageItem text="teste" />
        <PageItem text="teste" />
        <PageItem text="teste" />
      </div>
      <Button className="bg-transparent mt-6 rounded-none border border-dashed border-gray-500 text-gray-500 hover:bg-gray-200">+ Novo item</Button>
    </div>
  );
};
