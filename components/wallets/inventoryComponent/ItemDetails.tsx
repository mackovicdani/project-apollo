import Image from "next/image";

export default function ItemDetails(props: any) {
  const { item } = props;
  console.log(item);
  return (
    <div className="h-auto text-text">
      <div className="p-6">
        <div className="h-60 w-full rounded-lg border border-border bg-gradient-to-t from-dark to-primary-main/10 p-4">
          <div className="relative flex h-full w-full">
            <Image
              src={`/products/${item.product._id}.png`}
              objectFit="contain"
              layout="fill"
              alt="logo"
            />
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-secondary">
              {item.product.name}
            </h1>
            <h1 className="text-lg font-bold">{item.product.price} ft</h1>
          </div>
          <div className="flex gap-1">
            <h1 className="ml-1 text-xs font-medium uppercase text-text-disabled">
              {item.product.type}
            </h1>
            <h1 className="ml-1 text-xs font-medium uppercase text-text-disabled">
              {item.product.subtype}
            </h1>
          </div>
        </div>
      </div>

      <div className="flex h-20 w-full items-center justify-end gap-3 p-6">
        <button
          onClick={() => props.handleClose()}
          className="h-10 w-24 rounded-md border border-border bg-main text-sm text-text"
        >
          Close
        </button>
      </div>
    </div>
  );
}
