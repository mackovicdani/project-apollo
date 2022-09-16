import { motion } from "framer-motion";
import moment from "moment";

export default function PurchaseDetails(props: any) {
  return (
    <div className="flex max-w-md flex-col rounded-md bg-card text-text">
      <div className="p-7">
        <div className="">
          <h1>{props.purchase.user.name}</h1>
          <h2 className="text-xs">
            {moment(props.purchase.date)
              .locale("hun")
              .format("YYYY.MM.DD HH:mm:ss")}
          </h2>
          <h2 className="text-xs">{props.purchase.store.name}</h2>
        </div>
        <div className="scrollbar mt-3 flex h-full max-h-96 flex-col flex-nowrap gap-2 overflow-y-auto overflow-x-hidden border-b-[1px] border-elev p-3">
          {props.purchase.items.length > 0 &&
            props.purchase.items.map((item: any, index: number) => {
              return (
                <motion.div
                  initial={{ x: 100 }}
                  animate={{ x: 0 }}
                  key={index}
                  className=" relative flex h-10 min-h-[2.5rem] w-full rounded text-text"
                >
                  <div className="h-full w-10 rounded bg-secondary"></div>
                  <div className="flex flex-col">
                    <h2 className="ml-2">{item.product.name}</h2>
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
            {props.purchase.price}
            <span className="text-xs font-bold text-text-disabled">ft</span>
          </h2>
        </div>
      </div>

      <div className="flex h-20 w-full items-center justify-end gap-3 rounded-b-md bg-main p-10">
        <button
          type="button"
          onClick={() => {
            props.handleClose();
          }}
          className="h-10 w-24 rounded-md bg-card text-sm text-text"
        >
          Close
        </button>
      </div>
    </div>
  );
}
