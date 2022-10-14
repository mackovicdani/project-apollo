import WalletList from "./WalletList";

export default function WalletComponent() {
  return (
    <div className="h-full">
      <div className="flex h-16 justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Wallets</h1>
          <h2 className="ml-2 text-base text-text-disabled">
            Monday, April 4th
          </h2>
        </div>
        <div>
          {/* <div className="w-60 rounded-lg border border-border bg-main shadow"></div> */}
          <div className="h-12 w-12 rounded-lg border border-border bg-primary-main shadow hover:cursor-pointer"></div>
        </div>
      </div>
      <div className="h-[calc(100%-4rem)]">
        <div className="flex h-full w-full flex-col gap-6 2xl:flex-row">
          <div className="h-[300px] w-full 2xl:h-full 2xl:w-2/3">
            <WalletList></WalletList>
          </div>
          <div className="flex w-full flex-col items-center justify-between gap-2 sm:flex-row 2xl:w-1/3 2xl:flex-col">
            <div className=" h-[5.5rem] w-full rounded-lg border border-border bg-back"></div>
            <div className="h-[5.5rem] w-full rounded-lg border border-border bg-back"></div>
            <div className="h-[5.5rem] w-full rounded-lg border border-border bg-secondary"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
