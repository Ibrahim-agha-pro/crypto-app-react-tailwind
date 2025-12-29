import { createContext, useEffect, useState } from "react";
import { fetchCoins } from "../api/fetchCoins";

export const CoinsContext = createContext();

const CoinsProvider = ({ children }) => {
  const [coinsList, setCoinsList] = useState([]);
  const [searchedCoins, setSearchedCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCoins = async () => {
      setLoading(true);
      try {
        const data = await fetchCoins();
        setCoinsList(data);
      } catch (err) {
        console.log("something went wrong while fetching data !", err);
      } finally {
        setLoading(false);
      }
    };
    getCoins();
  }, []);
  return (
    <CoinsContext.Provider
      value={{
        coinsList,
        setCoinsList,
        searchedCoins,
        setSearchedCoins,
        loading,
        setLoading,
      }}
    >
      {children}
    </CoinsContext.Provider>
  );
};
export default CoinsProvider;
