import React from "react";
import { Button } from "./ui/button";
import { PageItem } from "./pageItem";
import { Trash2 } from "lucide-react";
import { DndContext, useDraggable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

export const CanvasPage = () => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const items = ["teste", "teste", "teste", "teste"];

  return (
    <DndContext>
      <SortableContext items={items}>
        <div
          ref={setNodeRef}
          style={style}
          {...listeners}
          {...attributes}
          className="flex flex-col p-4 bg-gray-300 rounded"
        >
          <Trash2 className="bg-gray-300 fill-gray-400 text-gray-500 mb-2 self-end p-1 rounded size-7 cursor-pointer" />
          <div className="flex flex-col gap-4 w-56">
            {items.map((item) => (
              <PageItem text={item} />
            ))}
          </div>
          <Button className="bg-transparent mt-6 rounded-none border border-dashed border-gray-500 text-gray-500 hover:bg-gray-200">
            + Novo item
          </Button>
        </div>
      </SortableContext>
    </DndContext>
  );
};
