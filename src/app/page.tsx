"use client";

import { DraggablePage } from "@/components/draggablePage";
import { MyDroppable } from "@/components/myDroppable";
import { PageItem } from "@/components/pageItem";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DragDropContext, Draggable, DraggableLocation, DropResult } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

//Tipagem para as páginas
type ItemProps = {
  id: string;
  title: string;
};

export type PageProps = {
  id: string;
  items: ItemProps[];
};

function App() {
  //Lista das páginas com seus itens
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

  //Adicionar página
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

  // Deletar página
  const DeletePage = (id: string) => {
    const newPages = pages.filter((x) => x.id !== id);
    setPages(newPages);
  };

  //Adicionar Item
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

  // Deletar Item
  const DeleteItem = (id: string) => {
    const newPages = pages.map((x) => ({
      ...x,
      items: x.items.filter((x) => x.id !== id),
    }));

    setPages(newPages);
  };

  //Reordena itens dentro da página após arrastar
  const reorder = (list: ItemProps[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  //Move item de uma página para outra
  const move = (
    source: ItemProps[],
    destination: ItemProps[],
    droppableSource: DraggableLocation,
    droppableDestination: DraggableLocation
  ) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result: Record<string, ItemProps[]> = {};
    
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    console.log(result);
    

    return result;
  };

  //Configuração para executar o arrastar e soltar
  function onDragEnd(result: DropResult) {
    const { source, destination } = result;

    //se há um destino ao arrastar
    if (!destination) {
      return;
    }
    //index do droppable de partida
    const sInd = +source.droppableId;
    //index do droppable de destino
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(pages[sInd].items, source.index, destination.index);
      const newPages = pages;
      newPages[sInd].items = items as ItemProps[];
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
    <main className="flex w-screen h-screen overflow-auto justify-center items-center gap-8 ">
      <DragDropContext onDragEnd={onDragEnd}>
        {pages.map((page, index) => (
          <MyDroppable key={index} droppableId={index.toString()}>
            {(provided) => (
              <div
                className="pointer-events-auto"
                key={page.id}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <DraggablePage
                  onDeletePage={() => DeletePage(page.id)}
                  onAddItem={() => AddItem(page.id)}
                >
                  {page.items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <PageItem
                            pages={pages}
                            setPages={setPages}
                            onDeleteItem={() => DeleteItem(item.id)}
                            item={item}
                          />
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
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 py-2 px-64 bg-neutral-200 border border-neutral-400 rounded-lg">
        <Button onClick={AddPage} className="py-6 px-12 bg-neutral-500">
          + Nova página
        </Button>
      </div>
    </main>
  );
}

export default App;
