import type { NextPage } from "next";
interface Props {
  wallets: any;
}

const Home: NextPage<Props> = () => {
  //const [modal, setModal] = useState(false);
  return (
    <>
      <h1 className="text-5xl text-white">HomePage</h1>
      {/* <button onClick={() => setModal(true)}>Modal</button>
      <Modal isOpen={modal} handleClose={() => setModal(false)} /> */}
    </>
  );
};

export default Home;
