import { useWallet } from "../../pages/wallets";
import ItemCard from "./Inventory/ItemCard";

export default function Inventory() {
  const { selected, selectedCategory, selectCategory } = useWallet();
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
                <ItemCard
                  key={item._id}
                  item={item}
                  animationDelay={index * 0.05}
                ></ItemCard>
              );
            })}
        </div>
      </div>
    </div>
  );
}
