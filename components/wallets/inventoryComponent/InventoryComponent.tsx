import { useWallet } from "../../../pages/wallets";
import Inventory from "./Inventory";

export default function InventoryComponent() {
  const { selectedCategory, selectCategory } = useWallet();
  return (
    <div className="h-full">
      <div className="flex h-16 justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Inventory</h1>
          <h2 className="ml-2 text-base text-text-disabled">
            {selectedCategory?.name.toUpperCase()}
          </h2>
        </div>
        <div>
          {/* <div className="w-60 rounded-lg border border-border bg-main shadow"></div> */}
          {selectedCategory && (
            <div
              className="h-12 w-12 rounded-lg border border-border bg-primary-main shadow hover:cursor-pointer"
              onClick={() => selectCategory(null)}
            ></div>
          )}
        </div>
      </div>
      <div className="h-[calc(100%-4rem)]">
        <Inventory></Inventory>
      </div>
    </div>
  );
}
