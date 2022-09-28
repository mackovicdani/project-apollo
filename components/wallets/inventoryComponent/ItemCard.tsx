import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Modal from "../../global/modal/Modal";
import ItemDetails from "./ItemDetails";

interface ProductCardProps {
  item: any;
  animationDelay: number;
}

export default function ItemCard(props: ProductCardProps) {
  const { item, animationDelay } = props;
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  return (
    <>
      <div className="aspect-square basis-full p-1 sm:basis-1/3 lg:basis-1/3 xl:basis-1/2 2xl:basis-1/6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: animationDelay }}
          className="flex h-full flex-col items-center justify-center gap-2 rounded-lg border border-border bg-main p-5 text-xs font-medium text-text hover:cursor-pointer"
          onClick={() => setIsDetailsOpen(item)}
        >
          <div className="relative flex h-full w-full">
            <Image
              src={`/products/${item.product._id}.png`}
              objectFit="contain"
              layout="fill"
              alt="logo"
            />
          </div>
        </motion.div>
      </div>
      <Modal isOpen={isDetailsOpen} size="max-w-md">
        <ItemDetails
          item={item}
          handleClose={() => setIsDetailsOpen(false)}
        ></ItemDetails>
      </Modal>
    </>
  );
}
