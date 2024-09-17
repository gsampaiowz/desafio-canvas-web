"use client";
import { DraggablePage } from "@/components/draggablePage";
import { PageItem } from "@/components/pageItem";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

type PageProps = {
  id: string;
  items: {
    id: string;
    title: string;
  }[];
};

const Desafio: React.FC = () => {
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

  return (
    // <InfiniteViewer
    // displayVerticalScroll={false}
    // displayHorizontalScroll={false}
    // className="!w-screen !h-screen"
    // useMouseDrag={true}
    // useWheelScroll={true}
    // useAutoZoom={true}
    // zoomRange={[0.1, 10]}
    // maxPinchWheel={10}
    // onDragStart={(e) => {
    //   const target = e.inputEvent.target;

    //   if (target.nodeName === "A") {
    //     e.stop();
    //   }
    // }}
    // >
    <main className="flex justify-center items-center h-screen w-screen">
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 py-2 px-64 bg-neutral-200 border border-neutral-400 rounded-lg">
        <Button onClick={AddPage} className="py-6 px-12 bg-neutral-500">
          + Nova página
        </Button>
      </div>
    </main>
    // </InfiniteViewer>
  );
};

export default Desafio;
