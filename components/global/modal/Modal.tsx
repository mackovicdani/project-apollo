import { UniversalPortal } from "@jesstelford/react-portal-universal";
import { motion } from "framer-motion";

export default function Modal(props: any) {
  return (
    <>
      {props.isOpen && (
        <UniversalPortal selector="#modal">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed top-0 bottom-0 right-0 left-0 z-[1000] flex items-center justify-center bg-dark/90"
          >
            <motion.div
              initial={{ scale: 0.3 }}
              animate={{ scale: 1 }}
              className="container relative max-w-lg overflow-hidden rounded-xl bg-card shadow-md"
            >
              <div className="p-10">{props.children}</div>
              <div className="flex h-20 w-full items-center justify-end gap-3 bg-main p-10">
                <button
                  onClick={() => props.handleClose()}
                  className="h-10 w-24 rounded-md bg-card text-sm text-text"
                >
                  Close
                </button>
                <button className="h-10 w-24 rounded-md bg-primary-main text-sm text-white">
                  Create
                </button>
              </div>
            </motion.div>
          </motion.div>
        </UniversalPortal>
      )}
    </>
  );
}
