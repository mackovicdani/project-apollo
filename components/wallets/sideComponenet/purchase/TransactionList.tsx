import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useUser from "../../../../lib/useUser";
import { useWallet } from "../../../../pages/wallets";
import usePagination from "../../../global/pagination/Pagination";
import Transaction from "./Transaction";

export default function TransactionList() {
  const { selected } = useWallet();
  const [modal, setModal] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const { username } = useUser();
  const { slicedArray, Pagination } = usePagination(
    transactions
      .filter(
        (transaction: any) =>
          transaction.recipient.name === username &&
          transaction.wallet === selected._id
      )
      .sort((a: any, b: any) => {
        if (a.date < b.date) {
          return 1;
        }
        if (a.date > b.date) {
          return -1;
        }
        return 0;
      })
  );

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const result = await axios.get(
        "http://localhost:3000/api/transactions/",
        config
      );
      setTransactions(result.data.data);
    };

    fetchData();
  }, []);
  return (
    <div className="relative flex w-full flex-col pt-3">
      <div className="flex h-12 items-center justify-between">
        <h1 className="text-center text-xl font-bold text-text">
          Transactions
        </h1>
      </div>
      <div className="scrollbar flex h-full flex-col gap-2 pt-4">
        {slicedArray.map((transaction: any, index: number) => {
          return (
            <Transaction
              transaction={transaction}
              index={index}
              key={transaction._id}
            />
          );
        })}
        {selected?.purchases.length === 0 && (
          <motion.h2
            key={"notransaction"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={"w-full text-center font-bold text-white"}
          >
            No added transaction!
          </motion.h2>
        )}
      </div>
      {Pagination}
    </div>
  );
}
