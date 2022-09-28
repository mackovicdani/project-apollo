import { useWallet } from "../../../pages/wallets";
import CategoryCard from "./CategoryCard";
import ItemCard from "./ItemCard";

export default function Inventory() {
  const { selected, selectedCategory } = useWallet();
  return (
    <div className="flex h-full max-h-[500px] w-full flex-col rounded-lg border border-border bg-back p-6">
      <div className="scrollbar w-full overflow-auto">
        <div className="flex w-full flex-wrap">
          {!selectedCategory &&
            selected?.inventory &&
            selected?.inventory.map((category: any, index: number) => {
              if (category.items && category.items.length > 0) {
                return <CategoryCard category={category} />;
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
