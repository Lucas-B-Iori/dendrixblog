"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { DemoModal } from "@/components/modals/DemoModal";

interface DemoModalContextType {
  openDemoModal: () => void;
  closeDemoModal: () => void;
  isOpen: boolean;
}

const DemoModalContext = createContext<DemoModalContextType | undefined>(undefined);

export function DemoModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openDemoModal = useCallback(() => setIsOpen(true), []);
  const closeDemoModal = useCallback(() => setIsOpen(false), []);

  return (
    <DemoModalContext.Provider value={{ openDemoModal, closeDemoModal, isOpen }}>
      {children}
      <DemoModal isOpen={isOpen} onClose={closeDemoModal} />
    </DemoModalContext.Provider>
  );
}

export function useDemoModal() {
  const context = useContext(DemoModalContext);
  if (!context) {
    // Retorno seguro caso chamado fora do provider
    return {
      openDemoModal: () => {},
      closeDemoModal: () => {},
      isOpen: false,
    };
  }
  return context;
}
