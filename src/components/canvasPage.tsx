import React, { useState } from "react";
import { Button } from "./ui/button";
import { PageItem } from "./pageItem";
import { Trash2 } from "lucide-react";
import { DndContext, UniqueIdentifier, useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";

interface PageProps {
  id: UniqueIdentifier;
  children: React.ReactNode;
  onAddItem?: () => void;
}

export const CanvasPage = ({ id, children, onAddItem }: PageProps) => {
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: "container",
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const [itemsPage, setItemsPage] = useState();

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="flex flex-col p-4 bg-gray-300 rounded w-min h-72"
    >
      <Trash2 className="bg-gray-300 fill-gray-400 text-gray-500 mb-2 self-end p-1 rounded size-7 cursor-pointer" />
      {children}
      <Button
        onClick={onAddItem}
        className="bg-transparent mt-6 rounded-none border border-dashed border-gray-500 text-gray-500 hover:bg-gray-200"
      >
        + Novo item
      </Button>
    </div>
  );
};
