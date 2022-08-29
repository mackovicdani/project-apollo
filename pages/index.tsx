import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import PurchaseList from "../components/wallets/PurchaseList";
import WalletList from "../components/wallets/WalletList";
interface Props {
  wallets: any;
}

const Home: NextPage<Props> = (props) => {
  //const [modal, setModal] = useState(false);
  return (
    <>
      {props.wallets && <WalletList wallets={props.wallets} />}
      <PurchaseList />
      {/* <button onClick={() => setModal(true)}>Modal</button>
      <Modal isOpen={modal} handleClose={() => setModal(false)} /> */}
    </>
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
