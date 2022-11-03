export default function MealTable() {
  return (
    <div className="flex h-full flex-row gap-1">
      <div className="grid h-full w-4/5 grid-cols-7 grid-rows-4 gap-1 overflow-hidden rounded-lg border border-border bg-main p-1">
        {[...Array(28)].map((number, index) => (
          <div key={index} className="rounded bg-back shadow-inner"></div>
        ))}
      </div>
      <div className="h-full w-1/5 rounded-lg border border-border bg-main"></div>
    </div>
  );
}
