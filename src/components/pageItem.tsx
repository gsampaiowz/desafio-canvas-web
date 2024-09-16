import { UniqueIdentifier, useDraggable } from "@dnd-kit/core";
import { Trash2 } from "lucide-react";
import React from "react";

interface PageItemProps {
  id: UniqueIdentifier;
  title: string;
}

export const PageItem = ({ id, title }: PageItemProps) => {
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
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="flex-1 flex justify-between items-center py-6 bg-neutral-400 gap-4 rounded px-3 relative z-50"
    >
      <p>{title}</p>
      <Trash2 className="bg-neutral-500 fill-neutral-400 text-neutral-600 mb-2 self-end p-1 rounded size-7 cursor-pointer" />
    </div>
  );
};
