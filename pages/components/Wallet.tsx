export default function Wallet(props: any) {
  const { name, id, assignedUsers, purchases } = props;
  return (
    <div className="w-96 rounded-xl bg-gray-50 p-4 shadow-md dark:bg-zinc-600">
      <h2 className="font-poppins text-xl font-bold text-gray-700 dark:text-zinc-50">
        Your wallets
      </h2>
      <div className="relative m-2  min-h-fit w-auto rounded-3xl bg-blue-400 p-4 shadow-lg">
        <h2 className="font-poppins text-2xl font-bold text-gray-50">{name}</h2>
        <h2 className=" ml-1 text-xs font-semibold text-gray-700">{id}</h2>
        {assignedUsers.map((assignedUser: any) => (
          <div
            key={assignedUser._id}
            className="mt-2 flex h-8 w-auto items-center justify-between rounded-md bg-zinc-700 p-3 shadow-md"
          >
            <h2 className="font-mono text-sm text-gray-50">
              {assignedUser.user.name}
            </h2>
            <h2
              className={`font-mono text-sm font-bold text-gray-700 ${
                assignedUser.money < 0 ? "text-red-600" : "text-green-800"
              }`}
            >
              {assignedUser.money}
              <span className="text-xs font-normal text-green-800"> ft</span>
            </h2>
          </div>
        ))}
      </div>
      <h2 className="font-poppins text-xl font-bold text-gray-700 dark:text-zinc-50">
        Purchases
      </h2>
      {purchases.map((purchase: any) => {
        return (
          <div
            key={purchase._id}
            className="mt-2 flex h-8 w-auto items-center justify-between rounded-md bg-sky-100 p-3 shadow-md dark:bg-zinc-700"
          >
            <h2 className="font-mono text-sm font-bold text-gray-700 dark:text-zinc-50">
              {purchase.user.name}
            </h2>
            <h2 className="font-mono text-sm font-bold dark:text-zinc-50">
              {purchase.price}
              <span className="text-xs font-normal text-green-800"> ft</span>
            </h2>
          </div>
        );
      })}
    </div>
  );
}
