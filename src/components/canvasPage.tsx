import React from "react";
import { Button } from "./ui/button";
import { PageItem } from "./pageItem";

interface CanvasPageProps {}

export const CanvasPage = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="h-80 bg-gray-400">
        <PageItem>Teste</PageItem>
        <PageItem>Teste</PageItem>
        <PageItem>Teste</PageItem>
      </div>
      <Button className="bg-transparent rounded-none border border-dashed border-gray-500 text-gray-500">+ Novo item</Button>
    </div>
  );
};
