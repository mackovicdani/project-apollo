import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
interface Props {
  user: string;
}

const Home: NextPage<Props> = (props) => {
  return (
    <main className="flex w-full justify-center">
      <h2>Welcome back {props.user}</h2>
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
  const { data } = await axios.get(
    "http://localhost:3000/api/auth/user",
    config
  );
  return {
    props: { user: data.username },
  };
};

export default Home;
