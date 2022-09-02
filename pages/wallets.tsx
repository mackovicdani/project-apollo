import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import { useDispatch } from "react-redux";
import WalletList from "../components/wallets/WalletList";
import { selectWallet } from "../slices/walletSlice";

interface Props {
  wallets: any;
}

const Wallets: NextPage<Props> = (props) => {
  const dispatch = useDispatch();
  dispatch(selectWallet(props.wallets[1]));
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
  try {
    const { data } = await axios.get(
      "http://localhost:3000/api/wallet/",
      config
    );
    return {
      props: { wallets: data.data },
    };
  } catch (error) {
    console.log(error);
  }
  return {
    props: { wallets: [] },
  };
};

export default Wallets;
