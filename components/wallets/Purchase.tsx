import moment from "moment";
import "moment/locale/hu";

export default function Purchase(props: any) {
  return (
    <div className="flex h-10 w-full items-center justify-between rounded-lg bg-card pl-5 pr-5 shadow-md">
      <h1 className="text-xs">
        {moment(props.purchase.date)
          .locale("hun")
          .format("YY.MMMM DD hh:mm:ss")}
      </h1>
      <h1 className="text-xs">{props.purchase.user.name}</h1>
      <h1 className="text-xs">{props.purchase.user.email}</h1>
      <h1 className="text-xs">{props.purchase.price}</h1>
    </div>
  );
}
