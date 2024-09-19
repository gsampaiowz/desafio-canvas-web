import React, { ReactNode } from "react";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

interface PageProps {
  children?: ReactNode;
  onDeletePage?: () => void;
  onAddItem?: () => void;
}

export const DraggablePage = ({ children, onDeletePage, onAddItem }: PageProps) => {
  return (
    <div className="flex flex-col justify-between p-4 bg-neutral-300 border border-neutral-400 rounded h-[500px]">
      <Trash2
        onClick={onDeletePage}
        className="bg-neutral-300 fill-neutral-400 text-neutral-500 mb-2 self-end p-1 rounded size-7 cursor-pointer relative z-50"
      />
      <div className="flex flex-col items-center gap-4 h-full overflow-auto">{children}</div>
      <Button
        className="bg-transparent mt-6 w-64 rounded-none border border-dashed border-neutral-500 text-neutral-500 hover:bg-neutral-200"
        onClick={onAddItem}
      >
        + Novo item
      </Button>
    </div>
  );
};
