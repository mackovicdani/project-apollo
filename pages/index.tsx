import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import Wallet from "./components/Wallet";
interface Props {
  wallets: any;
}

const Home: NextPage<Props> = (props) => {
  return (
    <main className="flex w-full flex-col items-center">
      {props.wallets &&
        props.wallets.map((wallet: any) => {
          return (
            <Wallet
              key={wallet._id}
              name={wallet.name}
              id={wallet._id}
              assignedUsers={wallet.assignedUsers}
              purchases={wallet.purchases}
            />
          );
        })}
    </main>
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

export default Home;
