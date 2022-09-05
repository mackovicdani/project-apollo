import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import { useDispatch } from "react-redux";
import AssignedUserList from "../components/wallets/AssignedUserList";
import PurchaseList from "../components/wallets/PurchaseList";
import WalletList from "../components/wallets/WalletList";
import { selectUser } from "../slices/userSlice";
import { selectWallet } from "../slices/walletSlice";

interface Props {
  wallets: any;
  user: any;
}

const Wallets: NextPage<Props> = (props) => {
  const dispatch = useDispatch();
  dispatch(selectWallet(props.wallets[0]));
  dispatch(selectUser(props.user));
  return (
    <div className="grid h-full grid-cols-3 grid-rows-xs lg:grid-rows-lg xl:grid-cols-5 xl:grid-rows-xl 2xl:grid-cols-6 2xl:grid-rows-xl2">
      <div className="col-span-3 flex items-center justify-center bg-back p-[10px] xl:col-span-4 2xl:col-span-4">
        <WalletList wallets={props.wallets}></WalletList>
      </div>
      <div className="2cx col-span-3 flex items-center justify-center p-[10px] lg:col-span-1 xl:col-span-1 2xl:row-span-2 2xl:row-start-2">
        <AssignedUserList></AssignedUserList>
      </div>
      <div className="col-span-3 flex items-center justify-center p-[10px] lg:col-span-2 xl:col-span-2 xl:row-span-2 2xl:row-span-3">
        <PurchaseList></PurchaseList>
      </div>
      <div className="flex items-center justify-center p-[10px]">
        <div className="h-full w-full rounded-lg bg-main "></div>
      </div>
      <div className="flex items-center justify-center p-[10px]">
        <div className="h-full w-full rounded-lg bg-main "></div>
      </div>
      <div className="flex items-center justify-center p-[10px]">
        <div className="h-full w-full rounded-lg bg-main "></div>
      </div>
      <div className="col-span-3 flex items-center justify-center p-[10px] xl:col-span-3">
        <div className="h-full w-full rounded-lg bg-main "></div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = context.req.headers.cookie;
  const config = {
    headers: {
      cookie: cookie!,
    },
  };
  let one = "http://localhost:3000/api/wallet/";
  let two = "http://localhost:3000/api/auth/user/";

  const [firstResponse, secondResponse] = await Promise.all([
    axios.get(one, config),
    axios.get(two, config),
  ]);
  return {
    props: { wallets: firstResponse.data.data, user: secondResponse.data.data },
  };
};

export default Wallets;
