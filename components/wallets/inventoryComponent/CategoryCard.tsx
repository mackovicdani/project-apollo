import { useWallet } from "../../../pages/wallets";

interface CategoryCardProps {
  category: any;
}
export default function CategoryCard(props: CategoryCardProps) {
  const { category } = props;
  const { selectCategory } = useWallet();
  return (
    <div
      className="aspect-square basis-1/2 p-1 sm:basis-1/4 lg:basis-1/6 xl:basis-1/4 2xl:basis-1/6"
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
