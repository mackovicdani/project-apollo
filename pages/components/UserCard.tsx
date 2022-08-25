import { NextPage } from "next";

interface Props {
  user: any;
}

const UserCard: NextPage<Props> = (props) => {
  return (
    <div className="relative m-2 h-36 w-64 rounded-lg bg-gray-50 p-2 text-gray-700 shadow-lg">
      <div className="absolute h-20 w-20 rounded-full bg-white shadow-md"></div>
      <h2 className=" absolute top-5 left-24 text-center text-sm font-semibold">
        {props.user}
      </h2>
    </div>
  );
};

export default UserCard;
