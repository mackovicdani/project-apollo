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
      <div className="relative aspect-square basis-1/2 p-1 sm:basis-1/3 lg:basis-1/4 xl:basis-1/4 2xl:basis-1/5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: animationDelay }}
          className="flex h-full flex-col items-center justify-center gap-2 rounded-lg border border-border bg-gradient-to-t from-dark to-primary-main/10 p-5 text-xs font-medium text-text hover:cursor-pointer"
          onClick={() => setIsDetailsOpen(item)}
        >
          <div className="relative flex aspect-square w-4/5">
            <Image
              src={`/products/${item.product._id}.png`}
              objectFit="contain"
              layout="fill"
              alt="logo"
            />
            <div className="absolute right-0 top-0 flex h-full w-2 items-center justify-center overflow-hidden rounded-lg border border-border bg-back p-1">
              <div className="absolute bottom-0 h-1/6 w-full bg-secondary"></div>
            </div>
          </div>
          {/* details */}
          <div className="absolute left-3 top-3 flex aspect-square w-8 items-center justify-center rounded-lg border border-border bg-back p-1">
            <h2 className="bold aspect-square text-lg font-extrabold text-secondary">
              {item.quantity}x
            </h2>
          </div>
          <div className="absolute bottom-4">
            <h2 className="bold">{item.product.name}</h2>
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
