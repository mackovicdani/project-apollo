import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
interface Props {
  wallets: any;
}

const Home: NextPage<Props> = (props) => {
  return (
    <main className="flex w-full flex-col items-center">
      {props.wallets.map((wallet: any) => {
        return (
          <div
            className="mt-2 w-64 rounded-md bg-gray-400 text-center text-gray-900 hover:cursor-pointer hover:bg-slate-300"
            key={wallet._id}
          >
            {wallet.name}
            {wallet.assignedUsers.map((assignedUser: any) => {
              return (
                <div
                  key={assignedUser.user._id}
                  className="m-1 flex justify-between rounded-md bg-gray-100 pl-3 pr-3"
                >
                  <h3>{assignedUser.user.name}</h3>
                  <h3>{assignedUser.money}ft</h3>
                </div>
              );
            })}
            {wallet.purchases.length > 0 && <div>Purchases:</div>}
            {wallet.purchases.map((purchase: any) => {
              return (
                <div
                  key={purchase._id}
                  className="m-1 flex justify-between rounded-md bg-gray-100 pl-3 pr-3"
                >
                  <h3>{purchase.user.name}</h3>
                  <h3>{purchase.price}ft</h3>
                </div>
              );
            })}
          </div>
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
  const { data } = await axios.get("http://localhost:3000/api/wallet/", config);

  return {
    props: { wallets: data.data },
  };
};

export default Home;
