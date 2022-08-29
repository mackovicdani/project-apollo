import Wallet from "./Wallet";

export default function WalletList(props: any) {
  const { wallets } = props;
  return (
    <div className="flex h-screen w-3/12 min-w-[350px] flex-col p-8">
      {wallets.map((wallet: any) => {
        return (
          <Wallet
            key={wallet._id}
            name={wallet.name}
            id={wallet._id}
            assignedUsers={wallet.assignedUsers}
            purchases={wallet.purchases}
          />
        );
      })}
    </div>
  );
}
