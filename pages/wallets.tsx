import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import WalletList from "../components/wallets/WalletList";

interface Props {
  wallets: any;
}

const Wallets: NextPage<Props> = (props) => {
  const [selectedWallet, setSelectedWallet] = useState(null);
  return (
    <div className=" bg-red-900">
      {props.wallets && <WalletList wallets={props.wallets} />}
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
