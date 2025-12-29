import { useContext, useEffect, useState } from "react";
import { CoinsContext } from "../contexts/CoinsContext";

export const SearchBar = () => {
  const [searchInput, setSearchedInput] = useState("");
  const { coinsList, setSearchedCoins } = useContext(CoinsContext);

  const search = () => {
    const exist = coinsList.filter((e) =>
      e.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    if (exist) setSearchedCoins(exist);
  };
  useEffect(() => {
    search();
  }, [searchInput]);
  return (
    <input
      value={searchInput}
      onChange={(e) => setSearchedInput(e.target.value)}
      className="border border-border py-3 px-6 w-full rounded-full outline-none focus:ring-primary focus:ring-1"
      placeholder="Search cryptos..."
    ></input>
  );
};
