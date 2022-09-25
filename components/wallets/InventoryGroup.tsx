import { useWallet } from "../../pages/wallets";
import Inventory from "./Inventory";

export default function InventoryGroup() {
  const { selected, selectedCategory, selectCategory } = useWallet();
  return (
    <div className="h-full">
      <div className="flex h-1/6 justify-between">
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
      <div className="h-5/6">
        <Inventory></Inventory>
      </div>
    </div>
  );
}
