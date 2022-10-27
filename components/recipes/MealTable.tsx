export default function MealTable() {
  return (
    <div className="grid h-full w-full grid-cols-7 grid-rows-4 gap-1 overflow-hidden rounded-lg border border-border bg-gradient-to-br from-primary-main to-secondary p-1">
      {[...Array(28)].map((number) => (
        <div key={number} className="bg-back/90"></div>
      ))}
    </div>
  );
}
