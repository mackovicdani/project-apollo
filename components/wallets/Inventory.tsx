import { useWallet } from "../../pages/wallets";

export default function Inventory() {
  const { selected } = useWallet();
  return (
    <div className="flex h-full max-h-[500px] w-full rounded-lg border border-border bg-back p-6">
      <div className="example grid h-full w-full snap-y snap-mandatory grid-cols-2 justify-center gap-2 overflow-auto md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
        {selected?.inventory &&
          selected?.inventory.map((category: any, index: number) => {
            if (category.items && category.items.length > 0) {
              return (
                <div
                  key={index}
                  className={`${
                    !category.items && "opacity-20"
                  } felx flex aspect-square w-full snap-start flex-col items-center justify-center rounded-lg border border-border bg-main text-text`}
                >
                  <h1 className="text-center text-xs font-medium uppercase">
                    {category.name}
                  </h1>
                  <h2 className="text-xs">{category.items.length}</h2>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}
