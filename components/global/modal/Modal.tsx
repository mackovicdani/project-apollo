import { UniversalPortal } from "@jesstelford/react-portal-universal";
import { AnimatePresence, motion } from "framer-motion";
import { ReactElement } from "react";

interface ModalProps {
  isOpen: boolean;
  size:
    | "max-w-xs"
    | "max-w-sm"
    | "max-w-md"
    | "max-w-lg"
    | "max-w-xl"
    | "max-w-2xl"
    | "max-w-3xl"
    | "max-w-4xl"
    | "max-w-5xl"
    | "max-w-6xl";
  children: ReactElement;
}

export default function Modal({ isOpen, size, children }: ModalProps) {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <UniversalPortal selector="#modal">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w fixed top-0 bottom-0 right-0 left-0 z-[1000] flex items-center justify-center bg-dark/90"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={`${size} container relative w-[90%] overflow-hidden rounded-lg border border-border bg-back shadow-md`}
              >
                {children}
              </motion.div>
            </motion.div>
          </UniversalPortal>
        )}
      </AnimatePresence>
    </>
  );
}
