import React, { ReactNode } from "react";

interface PageItemProps {
  children: ReactNode;
}

export const PageItem = ({ children }: PageItemProps) => {
  return <div className="flex-1 flex justify-center items-center py-6">{children}</div>;
};
