import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useWallet } from "../../pages/wallets";
import Modal from "../global/modal/Modal";
import ProductDetails from "./ProductDetails";

export default function Inventory() {
  const { selected, selectedCategory, selectCategory } = useWallet();
  const [isOpen, setIsOpen] = useState(null);
  return (
    <div className="flex h-full max-h-[500px] w-full flex-col gap-6 rounded-lg border border-border bg-back p-6">
      <div className="scrollbar w-full overflow-auto">
        <div className="flex w-full flex-wrap">
          {!selectedCategory &&
            selected?.inventory &&
            selected?.inventory.map((category: any, index: number) => {
              if (category.items && category.items.length > 0) {
                return (
                  <div
                    key={index}
                    className="aspect-square basis-1/2 p-1 sm:basis-1/3 lg:basis-1/3 xl:basis-1/2 2xl:basis-1/6"
                    onClick={() => selectCategory(category)}
                  >
                    <div className="flex h-full flex-col items-center justify-center rounded-lg border border-border bg-secondary text-xs font-bold text-text">
                      <h1 className="text-center text-xs font-medium uppercase">
                        {category.name}
                      </h1>
                      <h2 className="text-xs">{category.items.length}</h2>
                    </div>
                  </div>
                );
              }
            })}
          {selectedCategory?.items &&
            selectedCategory?.items.map((item: any, index: number) => {
              return (
                <div
                  className="aspect-square basis-full p-1 sm:basis-1/3 lg:basis-1/3 xl:basis-1/2 2xl:basis-1/6"
                  key={item._id}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex h-full flex-col items-center justify-center gap-2 rounded-lg border border-border bg-text p-5 text-xs font-medium text-text hover:cursor-pointer"
                    onClick={() => setIsOpen(item)}
                  >
                    <div className="relative flex h-full w-full">
                      <Image
                        src={`/products/${item.product._id}.png`}
                        objectFit="contain"
                        layout="fill"
                        alt="logo"
                      />
                    </div>
                    {/* <div className="flex gap-1">
                      <h2 className="text-secondary">
                        {item.quantity + "" + item.product.quantityType}
                      </h2>
                      <h1>{item.product.name}</h1>
                    </div> */}
                  </motion.div>
                </div>
              );
            })}
        </div>
        <Modal isOpen={isOpen} size="max-w-md">
          <ProductDetails
            item={isOpen}
            handleClose={() => setIsOpen(null)}
          ></ProductDetails>
        </Modal>
      </div>
    </div>
  );
}
