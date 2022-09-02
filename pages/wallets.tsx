import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import { useDispatch } from "react-redux";
import WalletList from "../components/wallets/WalletList";
import { selectUser } from "../slices/userSlice";
import { selectWallet } from "../slices/walletSlice";

interface Props {
  wallets: any;
  user: any;
}

const Wallets: NextPage<Props> = (props) => {
  const dispatch = useDispatch();
  dispatch(selectWallet(props.wallets[1]));
  dispatch(selectUser(props.user));
  return (
    <div className="grid h-full grid-cols-layout grid-rows-layout">
      <div className="col-span-4 flex items-center justify-center bg-back p-[10px]">
        <WalletList wallets={props.wallets}></WalletList>
      </div>
      <div className="row-span-3 flex items-center justify-center border border-dark bg-card">
        02
      </div>
      <div className="row-span-2 flex items-center justify-center border border-dark bg-card">
        03
      </div>
      <div className="flex items-center justify-center border border-dark bg-card">
        04
      </div>
      <div className="flex items-center justify-center border border-dark bg-card">
        05
      </div>
      <div className="flex items-center justify-center border border-dark bg-card">
        06
      </div>
      <div className="col-span-3 flex items-center justify-center border border-dark bg-card">
        07
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
