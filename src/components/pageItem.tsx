import { Trash2 } from "lucide-react";
import React from "react";

interface PageItemProps {
  title: string;
}

export const PageItem = ({ title }: PageItemProps) => {
  return (
    <div className="flex-1 flex justify-between items-center py-6 bg-neutral-400 gap-4 rounded px-3 pointer-events-none relative z-50">
      <p>{title}</p>
        <Trash2 className="bg-neutral-500 fill-neutral-400 text-neutral-600 self-end p-1 rounded size-7 cursor-pointer pointer-events-auto" />
    </div>
  );
};
