import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { numberToColorHsl } from "../../../lib/colors";
import Modal from "../../global/modal/Modal";
import ItemDetails from "./ItemDetails";

var convert = require("convert-units");

interface ProductCardProps {
  item: any;
  animationDelay: number;
}

export default function ItemCard(props: ProductCardProps) {
  const { item, animationDelay } = props;
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  function displayedQuantity() {
    const quantityType = convert()
      .from(item.product.quantityType)
      .possibilities()[2];
    const packageSize = convert(item.product.packageSize)
      .from(item.product.quantityType)
      .to(quantityType);
    const whole = Math.floor(item.quantity / packageSize);
    const remainderInNumber = item.quantity % packageSize;
    const remainder = (remainderInNumber / packageSize) * 100;
    return { whole, remainder, remainderInNumber, quantityType };
  }

  return (
    <>
      <div className="relative aspect-square basis-1/2 p-1 sm:basis-1/3 lg:basis-1/4 xl:basis-1/4 2xl:basis-1/5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`${
            displayedQuantity().whole < 1 && displayedQuantity().remainder < 50
              ? "to-primary-main/10"
              : displayedQuantity().whole >= 1
              ? "to-primary-main/10"
              : "to-primary-main/10"
          } flex h-full flex-col items-center justify-center gap-2 rounded-lg border border-border bg-gradient-to-t from-dark p-5 text-xs font-medium text-text hover:cursor-pointer`}
          onClick={() => setIsDetailsOpen(item)}
        >
          <div className="relative flex aspect-square w-4/5">
            <Image
              src={`/products/${item.product._id}.png`}
              objectFit="contain"
              layout="fill"
              alt="logo"
            />
            {displayedQuantity().remainder > 0 && (
              <div className="absolute right-0 top-0 flex h-full w-2 items-center justify-center overflow-hidden rounded-lg border border-border bg-back p-1 shadow-md">
                <motion.div
                  initial={{ height: 0, backgroundColor: numberToColorHsl(0) }}
                  animate={{
                    height: displayedQuantity().remainder + "%",
                    backgroundColor: numberToColorHsl(
                      displayedQuantity().remainder
                    ),
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute bottom-0 w-full rounded-full opacity-50"
                ></motion.div>
              </div>
            )}
          </div>
          {/* details */}
          {displayedQuantity().whole >= 1 && (
            <div className="absolute left-3 top-3 flex items-center justify-center rounded-lg border border-border bg-back p-1">
              <h2 className={`bold text-lg font-extrabold text-secondary`}>
                {displayedQuantity().whole}x
              </h2>
            </div>
          )}
          <div className="absolute bottom-4">
            <h2 className="bold">{item.product.name}</h2>
          </div>
          {displayedQuantity().remainder > 0 && (
            <div
              className="absolute right-[7%] rotate-90 text-xs"
              style={{
                color: numberToColorHsl(displayedQuantity().remainder),
              }}
            >
              <h2 className="bold">
                {displayedQuantity().remainderInNumber +
                  " " +
                  displayedQuantity().quantityType}
              </h2>
            </div>
          )}
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
