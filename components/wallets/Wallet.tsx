export default function Wallet(props: any) {
  const { name } = props;
  return (
    <div className="mb-5 h-44 w-full rounded-lg bg-card p-5 text-gray-100 shadow-md">
      <h2 className=" text-3xl">{name}</h2>
    </div>
  );
}
