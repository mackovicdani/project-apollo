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
              className={`${props.size} container relative w-[90%] rounded-xl bg-card shadow-md`}
            >
              {props.children}
            </motion.div>
          </motion.div>
        </UniversalPortal>
      )}
    </>
  );
}
