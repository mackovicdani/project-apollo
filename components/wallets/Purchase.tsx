export default function Purchase(props: any) {
  return (
    <div className="flex h-12 w-full items-center justify-between rounded-lg bg-card pl-5 pr-5 shadow-md">
      <h1>{props.purchase.date}</h1>
      <h1>{props.purchase.user.name}</h1>
      <h1>{props.purchase.user.email}</h1>
      <h1>{props.purchase.price}</h1>
    </div>
  );
}
