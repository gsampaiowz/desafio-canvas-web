"use client";

import { DraggablePage } from "@/components/draggablePage";
import { MyDroppable } from "@/components/myDroppable";
import { PageItem } from "@/components/pageItem";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import InfiniteViewer from "react-infinite-viewer";
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
          id: `item-${uuid()}`,
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

  const getItems = (count: any, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
      id: `item-${k + offset}-${new Date().getTime()}`,
      content: `item ${k + offset}`,
    }));

  const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  /**
   * Moves an item from one list to another list.: any
   */
  const move = (
    source: any,
    destination: any,
    droppableSource: any,
    droppableDestination: any
  ) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {} as any;
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  function onDragEnd(result: any) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(pages[sInd].items, source.index, destination.index);
      const newPages = pages;
      newPages[sInd].items = items as any;
      setPages(newPages);
    } else {
      const result = move(
        pages[sInd].items,
        pages[dInd].items,
        source,
        destination
      );
      const newPages = pages;

      newPages[sInd].items = result[sInd];
      newPages[dInd].items = result[dInd];

      setPages(newPages);
    }
  }

  return (
    <InfiniteViewer
      displayVerticalScroll={false}
      displayHorizontalScroll={false}
      className="!w-screen !h-screen flex justify-center items-center viewer"
      useMouseDrag={true}
      useWheelScroll={true}
      useAutoZoom={true}
      zoomRange={[0.1, 10]}
      maxPinchWheel={10}
      onDragStart={(e) => {
        const target = e.inputEvent.target;
        if (target.id !== "main") {
          e.stop();
        }
      }}
    >
      <div id="main" className="flex justify-center items-center gap-8">
        <DragDropContext onDragEnd={onDragEnd}>
          {pages.map((page, index) => (
            <MyDroppable key={index} droppableId={index.toString()}>
              {(provided, snapshot) => (
                <div
                  className="pointer-events-auto"
                  key={page.id}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <DraggablePage onAddItem={() => AddItem(page.id)}>
                    {page.items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <PageItem title={item.title} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </DraggablePage>
                  {provided.placeholder}
                </div>
              )}
            </MyDroppable>
          ))}
        </DragDropContext>
      </div>
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 py-2 px-64 bg-neutral-200 border border-neutral-400 rounded-lg">
          <Button onClick={AddPage} className="py-6 px-12 bg-neutral-500">
            + Nova página
          </Button>
        </div>
    </InfiniteViewer>
  );
}

export default App;
