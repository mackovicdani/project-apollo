export default function WalletList(props: any) {
  const { children } = props;
  return (
    <div className="flex h-screen w-3/12 min-w-[350px] flex-col p-8">
      {children}
    </div>
  );
}
