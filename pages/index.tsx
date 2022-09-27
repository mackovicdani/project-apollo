import type { NextPage } from "next";
interface Props {
  wallets: any;
}

const Home: NextPage<Props> = () => {
  //const [modal, setModal] = useState(false);
  return (
    <div className="p-12">
      <h1 className="text-3xl font-bold text-white">Home</h1>
      {/* <button onClick={() => setModal(true)}>Modal</button>
      <Modal isOpen={modal} handleClose={() => setModal(false)} /> */}
    </div>
  );
};

export default Home;
