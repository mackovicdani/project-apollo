const Categories = [
  {
    name: "Fruits",
    icon: "fruits.png",
    count: 10,
  },
  {
    name: "Vegetables",
    icon: "vegetables.png",
    count: 10,
    items: [{ name: "Répa" }, { name: "Hagyma" }, { name: "Cukkini" }],
  },
  {
    name: "Canned goods",
    icon: "cannedGoods.png",
    count: 10,
  },
  {
    name: "Froozen Foods",
    icon: "froozenFoods.png",
    count: 10,
  },
  {
    name: "Meat",
    icon: "meat.png",
    count: 10,
  },
  {
    name: "Fish",
    icon: "fish.png",
    count: 10,
  },
  {
    name: "Deli",
    icon: "deli.png",
    count: 10,
  },
  {
    name: "Condiments & Spices",
    icon: "spices.png",
    count: 10,
  },
  {
    name: "Souces & Oils",
    icon: "soucesOils.png",
    count: 10,
  },
  {
    name: "Snacks",
    icon: "snacks.png",
    count: 10,
  },
  {
    name: "Bread & Bakery",
    icon: "breadBakery.png",
    count: 10,
  },
  {
    name: "Beverages",
    icon: "beverages.png",
    count: 10,
  },
  {
    name: "Pasta & Rice",
    icon: "pastaRice.png",
    count: 10,
  },
  {
    name: "Cereal",
    icon: "fruits.png",
    count: 10,
  },
  {
    name: "Baking",
    icon: "fruits.png",
    count: 10,
  },
  {
    name: "Personal Care",
    icon: "personal.png",
    count: 10,
  },
  {
    name: "Health Care",
    icon: "health.png",
    count: 10,
  },
  {
    name: "Paper & Wrap",
    icon: "paper.png",
    count: 10,
    items: [{ name: "test" }],
  },
  {
    name: "Household supplies",
    icon: "household.png",
    count: 10,
  },
  {
    name: "Other Items",
    icon: "other.png",
    count: 10,
    items: [],
  },
];

export default function Inventory() {
  return (
    <div className="flex h-full max-h-[500px] w-full rounded-lg border border-border bg-back p-6">
      <div className="example grid h-full w-full snap-y snap-mandatory grid-cols-2 justify-center gap-2 overflow-auto md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
        {Categories.map((category: any, index: number) => {
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
