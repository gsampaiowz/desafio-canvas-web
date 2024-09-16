"use client";
import { CanvasPage } from "@/components/canvasPage";
import { PageItem } from "@/components/pageItem";
import { Button } from "@/components/ui/button";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useRef, useState } from "react";
import InfiniteViewer, { InfiniteViewerProps } from "react-infinite-viewer";
import { v4 as uuidv4 } from "uuid";

type DNDType = {
  id: UniqueIdentifier;
  items: {
    id: UniqueIdentifier;
    title: string;
  }[];
};

const HomePage: React.FC = () => {
  // const viewer = useRef<InfiniteViewerProps>(null);

  const [pages, setPages] = useState<DNDType[]>([]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [currentPageId, setCurrentPageId] = useState<UniqueIdentifier>();

  const onAddPage = () => {
    const id = `container-${uuidv4()}`;
    setPages([
      ...pages,
      {
        id,
        items: [],
      },
    ]);
  };

  const onAddItem = (pageId: UniqueIdentifier) => {
    console.log("teste");
    const id = `item-${uuidv4()}`;
    const page = pages.find((item) => item.id === pageId);
    console.log("teste");
    if (!page) return;

    page.items.push({
      id,
      title: "teste",
    });
    setPages([...pages]);
  };

  // Find the value of the items
  function findValueOfItems(id: UniqueIdentifier | undefined, type: string) {
    if (type === "container") {
      return pages.find((item) => item.id === id);
    }
    if (type === "item") {
      return pages.find((container) =>
        container.items.find((item) => item.id === id)
      );
    }
  }

  const findItemTitle = (id: UniqueIdentifier | undefined) => {
    const container = findValueOfItems(id, "item");
    if (!container) return "";
    const item = container.items.find((item) => item.id === id);
    if (!item) return "";
    return item.title;
  };

  const findPageItems = (id: UniqueIdentifier | undefined) => {
    const container = findValueOfItems(id, "container");
    if (!container) return [];
    return container.items;
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  }

  const handleDragMove = (event: DragMoveEvent) => {
    const { active, over } = event;

    // Handle Items Sorting
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("item") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active container and over container
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "item");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = pages.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = pages.findIndex(
        (container) => container.id === overContainer.id
      );

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );
      const overitemIndex = overContainer.items.findIndex(
        (item) => item.id === over.id
      );
      // In the same container
      if (activeContainerIndex === overContainerIndex) {
        let newItems = [...pages];
        newItems[activeContainerIndex].items = arrayMove(
          newItems[activeContainerIndex].items,
          activeitemIndex,
          overitemIndex
        );

        setPages(newItems);
      } else {
        // In different pages
        let newItems = [...pages];
        const [removeditem] = newItems[activeContainerIndex].items.splice(
          activeitemIndex,
          1
        );
        newItems[overContainerIndex].items.splice(
          overitemIndex,
          0,
          removeditem
        );
        setPages(newItems);
      }
    }

    // Handling Item Drop Into a Container
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("container") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "container");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = pages.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = pages.findIndex(
        (container) => container.id === overContainer.id
      );

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );

      // Remove the active item from the active container and add it to the over container
      let newItems = [...pages];
      const [removeditem] = newItems[activeContainerIndex].items.splice(
        activeitemIndex,
        1
      );
      newItems[overContainerIndex].items.push(removeditem);
      setPages(newItems);
    }
  };

  // This is the function that handles the sorting of the pages and items when the user is done dragging.
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    // Handling Container Sorting
    if (
      active.id.toString().includes("container") &&
      over?.id.toString().includes("container") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the index of the active and over container
      const activeContainerIndex = pages.findIndex(
        (container) => container.id === active.id
      );
      const overContainerIndex = pages.findIndex(
        (container) => container.id === over.id
      );
      // Swap the active and over container
      let newItems = [...pages];
      newItems = arrayMove(newItems, activeContainerIndex, overContainerIndex);
      setPages(newItems);
    }

    // Handling item Sorting
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("item") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "item");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;
      // Find the index of the active and over container
      const activeContainerIndex = pages.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = pages.findIndex(
        (container) => container.id === overContainer.id
      );
      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );
      const overitemIndex = overContainer.items.findIndex(
        (item) => item.id === over.id
      );

      // In the same container
      if (activeContainerIndex === overContainerIndex) {
        let newItems = [...pages];
        newItems[activeContainerIndex].items = arrayMove(
          newItems[activeContainerIndex].items,
          activeitemIndex,
          overitemIndex
        );
        setPages(newItems);
      } else {
        // In different pages
        let newItems = [...pages];
        const [removeditem] = newItems[activeContainerIndex].items.splice(
          activeitemIndex,
          1
        );
        newItems[overContainerIndex].items.splice(
          overitemIndex,
          0,
          removeditem
        );
        setPages(newItems);
      }
    }
    // Handling item dropping into Container
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("container") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "container");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;
      // Find the index of the active and over container
      const activeContainerIndex = pages.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = pages.findIndex(
        (container) => container.id === overContainer.id
      );
      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );

      let newItems = [...pages];
      const [removeditem] = newItems[activeContainerIndex].items.splice(
        activeitemIndex,
        1
      );
      newItems[overContainerIndex].items.push(removeditem);
      setPages(newItems);
    }
    setActiveId(null);
  }

  return (
    // <InfiniteViewer
    // displayVerticalScroll={false}
    // displayHorizontalScroll={false}
    // ref={viewer as any}
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
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragMove={handleDragMove}
      >
        <SortableContext items={pages.map((i) => i.id)}>
          {pages.map((page, index) => (
            <CanvasPage
              id={page.id}
              onAddItem={() => onAddItem(page.id)}
              key={index}
            >
              <SortableContext items={page.items.map((i) => i.id)}>
                <div className="flex flex-col gap-4 w-56">
                  {page.items.map((i) => (
                    <PageItem title={i.title} id={i.id} key={i.id} />
                  ))}
                </div>
              </SortableContext>
            </CanvasPage>
          ))}
        </SortableContext>
      </DndContext>

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 py-2 px-64 bg-neutral-200 border border-neutral-400 rounded-lg">
        <Button onClick={onAddPage} className="py-6 px-12 bg-neutral-500">
          + Nova página
        </Button>
      </div>
    </main>
    // </InfiniteViewer>
  );
};

export default HomePage;
