import { motion } from "framer-motion";
import moment from "moment";
import Image from "next/image";

export default function PurchaseDetails(props: any) {
  return (
    <div>
      <div className="p-3 text-text">
        <div className="flex flex-col items-center">
          <h1 className="text-center text-2xl font-extrabold text-secondary">
            Purchase details
          </h1>
          <div className="flex w-full flex-col items-center py-1">
            <p className="text-base font-semibold">
              {props.purchase.user.name}
            </p>
            <p className="text-xs">
              {moment(props.purchase.date)
                .locale("hun")
                .format("YYYY.MM.DD HH:mm:ss")}
            </p>
            <p className="text-xs">{props.purchase.store.name}</p>
          </div>
        </div>
        <div className="scrollbar mt-3 flex h-full max-h-96 flex-col flex-nowrap gap-2 overflow-y-auto overflow-x-hidden border-b border-main p-3">
          {props.purchase.items.length > 0 &&
            props.purchase.items.map((item: any, index: number) => {
              return (
                <motion.div
                  initial={{ scale: 1.01 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  key={index}
                  className=" relative flex h-10 min-h-[2.5rem] w-full rounded text-text"
                >
                  <div className="h-full w-10">
                    <div className="relative flex h-full w-full">
                      <Image
                        src={`/products/${item.product._id}.png`}
                        objectFit="contain"
                        layout="fill"
                        alt="logo"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h2 className="ml-2">
                      {item.product.name}{" "}
                      {item.product.packageSize + item.product.quantityType}
                    </h2>
                    <h2 className="ml-3 -mt-1 text-xs font-bold text-secondary">
                      {item.product.category.toUpperCase()}
                    </h2>
                  </div>
                  <div className="absolute right-0">
                    <div className="flex items-center">
                      <h2 className=" text-white">
                        {item.price + " "}
                        <span className="text-xs font-bold text-text-disabled">
                          ft
                        </span>
                      </h2>
                    </div>

                    <h2 className="-mt-1 text-right text-xs font-bold text-secondary">
                      {item.quantity}db
                    </h2>
                  </div>
                </motion.div>
              );
            })}
        </div>
        <div className="p-3 text-white">
          <h2 className="text-end">
            <span className="text-xs">Sum:</span> {props.purchase.price}
            <span className="text-xs font-bold text-text-disabled"> ft</span>
          </h2>
        </div>
      </div>

      <div className="flex h-16 w-full items-center justify-end gap-3 border-t border-border bg-dark p-3">
        <button
          type="button"
          onClick={() => {
            props.handleClose();
          }}
          className="h-10 w-24 rounded-md border border-border bg-back text-sm text-text"
        >
          Close
        </button>
      </div>
    </div>
  );
}
