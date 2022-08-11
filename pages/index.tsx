import type { GetServerSideProps, NextPage } from "next";
import clientPromise from "../lib/mongodb";
interface Props {
  isConnected: boolean;
}

const Home: NextPage<Props> = (props) => {
  return (
    <main className="w-full flex justify-center">
      {props.isConnected ? (
        <h2 className="text-3xl p-10 bg-green-900 rounded-lg text-white m-4">
          You are connected to MongoDB
        </h2>
      ) : (
        <h2 className="text-3xl p-10 bg-red-900 rounded-lg text-white m-4">
          You are NOT connected to MongoDB
        </h2>
      )}
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    await clientPromise;
    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

export default Home;
