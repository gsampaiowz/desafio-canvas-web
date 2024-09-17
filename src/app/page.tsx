"use client";

import { DraggablePage } from "@/components/draggablePage";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { createSwapy } from "swapy";
import { v4 as uuid } from "uuid";

function App() {
  type PageProps = {
    id: string;
    items: {
      id: string;
      title: string;
    }[];
  };

  const [pages, setPages] = useState<PageProps[]>([
    {
      id: uuid(),
      items: [
        {
          id: uuid(),
          title: "Item 1",
        },
      ],
    },
  ]);

  const AddPage = () => {
    const id = `container-${uuid()}`;
    setPages([
      ...pages,
      {
        id,
        items: [],
      },
    ]);
  };

  const AddItem = (pageId: string) => {
    const id = `item-${uuid()}`;
    const page = pages.find((item) => item.id === pageId);

    if (!page) return;

    page.items.push({
      id,
      title: "Item " + (page.items.length + 1),
    });
    setPages([...pages]);
  };

  const containerDrag = useRef(null);
  useEffect(() => {
    const swapy = createSwapy(containerDrag.current);
    swapy.onSwap(({ data }) => {
      localStorage.setItem("slotItem", JSON.stringify(data.object));
    });

    return () => {
      swapy.destroy();
    };
  }, [pages]);

  return (
    <main>
      <div ref={containerDrag} className="flex gap-4">
        {pages.map((page, index) => (
            <div key={page.id} data-swapy-slot={index}>
              <div data-swapy-item={index}>
                <DraggablePage />
              </div>
            </div>
        ))}
        {/* <div data-swapy-slot={0}>
            <div data-swapy-item={0} >
              <DraggablePage />
            </div>
          </div>
          <div data-swapy-slot={1}>
            <div data-swapy-item={1} >
              <DraggablePage />
            </div>
          </div> */}
      </div>
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 py-2 px-64 bg-neutral-200 border border-neutral-400 rounded-lg">
        <Button onClick={AddPage} className="py-6 px-12 bg-neutral-500">
          + Nova página
        </Button>
      </div>
    </main>
  );
}

export default App;
