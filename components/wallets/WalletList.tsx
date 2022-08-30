import Wallet from "./Wallet";

export default function WalletList(props: any) {
  const { wallets } = props;
  return (
    <div className="flex h-screen w-3/12 min-w-[350px] flex-col justify-center gap-5 p-5">
      {wallets.map((wallet: any) => {
        return <Wallet key={wallet._id} wallet={wallet} />;
      })}
    </div>
  );
}
