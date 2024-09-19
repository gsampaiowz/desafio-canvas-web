"use client";
import { PageProps } from "@/app/page";
import { Pencil, Trash2 } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";

interface PageItemProps {
  item: { id: string; title: string };
  onDeleteItem: () => void;
  pages: PageProps[];
  setPages: Dispatch<SetStateAction<PageProps[]>>;
}

export const PageItem = ({
  item,
  onDeleteItem,
  pages,
  setPages,
}: PageItemProps) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(item.title);

  // Editar item
  const EditItem = (id: string, title: string) => {
    const newPages = pages.map((page) => ({
      ...page,
      items: page.items
        .filter((i) => i.id !== id)
        .concat({
          ...page.items.find((i) => i.id === id),
          title,
        } as { id: string; title: string }),
    }));

    setPages(newPages);
  };

  return (
    <div className="flex-1 w-60 flex justify-between items-center py-6 bg-neutral-400 gap-4 rounded px-3">
      {edit ? (
        <input
          type="text"
          className="w-32 pl-1 outline-none rounded border-2 focus:border-zinc-700"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <p>{item.title}</p>
      )}
      <div className="flex gap-2">
        <Pencil
          onClick={() => {
            edit && EditItem(item.id, value);

            setEdit(!edit);
          }}
          className="bg-neutral-500 fill-neutral-400 text-neutral-600 self-end p-1 rounded size-7 cursor-pointer pointer-events-auto"
        />
        <Trash2
          onClick={onDeleteItem}
          className="bg-neutral-500 fill-neutral-400 text-neutral-600 self-end p-1 rounded size-7 cursor-pointer pointer-events-auto"
        />
      </div>
    </div>
  );
};
