import { UniversalPortal } from "@jesstelford/react-portal-universal";
import { AnimatePresence, motion } from "framer-motion";

export default function Modal(props: any) {
  return (
    <>
      <AnimatePresence>
        {props.isOpen && (
          <UniversalPortal selector="#modal">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed top-0 bottom-0 right-0 left-0 z-[1000] flex items-center justify-center bg-dark/90"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={`${props.size} container relative w-[90%] overflow-hidden rounded-xl border border-border bg-back shadow-md`}
              >
                {props.children}
              </motion.div>
            </motion.div>
          </UniversalPortal>
        )}
      </AnimatePresence>
    </>
  );
}
