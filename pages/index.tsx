import type { NextPage } from "next";
interface Props {
  wallets: any;
}

const Home: NextPage<Props> = (props) => {
  //const [modal, setModal] = useState(false);
  return (
    <>
      <h1>HomePage</h1>
      {/* <button onClick={() => setModal(true)}>Modal</button>
      <Modal isOpen={modal} handleClose={() => setModal(false)} /> */}
    </>
  );
};

export default Home;
