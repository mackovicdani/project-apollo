import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import { useSelector } from "react-redux";
import PurchaseList from "../components/wallets/PurchaseList";
import WalletList from "../components/wallets/WalletList";
import { RootState } from "../store";

interface Props {
  wallets: any;
}

const Wallets: NextPage<Props> = (props) => {
  const selected = useSelector((state: RootState) => state.wallet.value);

  return (
    <div className="flex w-full">
      {props.wallets && <WalletList wallets={props.wallets} />}
      <PurchaseList />
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
