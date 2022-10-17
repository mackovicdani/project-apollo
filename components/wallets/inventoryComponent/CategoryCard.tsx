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
      <div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-lg border border-border bg-gradient-to-tl from-main via-primary-main to-main">
        <h1 className="absolute -rotate-45 text-center text-[1.5rem] font-bold uppercase text-text">
          {category.name}
        </h1>
      </div>
    </div>
  );
}
