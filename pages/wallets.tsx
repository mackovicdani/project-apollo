import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../slices/walletSlice";
import type { RootState } from "../store";

interface Props {
  wallets: any;
}

const Wallets: NextPage<Props> = (props) => {
  const count = useSelector((state: RootState) => state.wallet.value);
  const dispatch = useDispatch();
  const [selectedWallet, setSelectedWallet] = useState(null);
  return (
    <div className=" bg-red-900">
      {/* {props.wallets && <WalletList wallets={props.wallets} />} */}
      <button
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <span>{count}</span>
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
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
