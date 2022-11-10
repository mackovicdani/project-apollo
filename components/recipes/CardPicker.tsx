import { useState } from "react";
import { useWallet } from "../../pages/wallets";

export default function CardPicker() {
  const { selected, wallets, selectWallet } = useWallet();
  const [selectedId, setSelectedId] = useState(0);

  return (
    <div
      className="flex h-10 w-full items-center justify-center border border-border bg-primary-main font-bold text-text hover:cursor-pointer"
      onClick={() => {
        if (selectedId + 1 == wallets.length) setSelectedId(0);
        else setSelectedId(selectedId + 1);
        selectWallet(wallets[selectedId]);
      }}
    >
      {selected.name}
    </div>
  );
}
