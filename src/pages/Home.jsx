import { useContext, useState } from "react";
import { Navbar } from "../components/Navbar";
import { SearchBar } from "../components/SearchBar";
import { CoinCard } from "../components/CoinCard";
import { CoinsContext } from "../contexts/CoinsContext";
import { Footer } from "../components/Footer";
import { Loader } from "../components/Loader";

export const Home = () => {
  const { coinsList, searchedCoins, loading } = useContext(CoinsContext);

  const [viewMode, setViewMode] = useState("list");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  if (!coinsList) return "loading...";

  const sortOptions = [
    {
      label: "Market Cap (High → Low)",
      value: "market_cap_desc",
    },
    {
      label: "Market Cap (Low → High)",
      value: "market_cap_asc",
    },
    {
      label: "Name (A → Z)",
      value: "name_asc",
    },
    {
      label: "Name (Z → A)",
      value: "name_desc",
    },
    {
      label: "Price (Low → High)",
      value: "price_asc",
    },
    {
      label: "Price (High → Low)",
      value: "price_desc",
    },
    {
      label: "24h Change (High → Low)",
      value: "change_24h_desc",
    },
    {
      label: "24h Change (Low → High)",
      value: "change_24h_asc",
    },
  ];

  const sortedCoins = [...coinsList].sort((a, b) => {
    switch (sortBy) {
      case "market_cap_desc":
        return b.market_cap - a.market_cap;
      case "market_cap_asc":
        return a.market_cap - b.market_cap;
      case "name_desc":
        return b.name.localeCompare(a.name);
      case "name_asc":
        return a.name.localeCompare(b.name);
      case "price_asc":
        return a.current_price - b.current_price;
      case "price_desc":
        return b.current_price - a.current_price;
      case "change_24h_desc":
        return b.price_change_percentage_24h - a.price_change_percentage_24h;
      case "change_24h_asc":
        return a.price_change_percentage_24h - b.price_change_percentage_24h;
      default:
        return 0;
    }
  });

  const diplayedCoins = searchedCoins.length > 0 ? searchedCoins : sortedCoins;
  return (
    <div className="min-h-screen relative">
      <Navbar child={<SearchBar />} />
      {loading ? (
        <Loader />
      ) : (
        <div className="container mx-auto py-5 sm:py-10 px-8 sm:px-16">
          <div className="flex justify-between mb-5">
            <div className="max-sm:text-center max-sm:space-y-3 space-x-3">
              <label className="max-sm:block">Sort by : </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="max-sm:text-sm rounded-lg py-2 pl-3  border border-border hover:drop-shadow-2xl transition duration-300 bg-background text-white"
              >
                {sortOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="text-white bg-black"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:space-x-3 max-sm:flex-col max-sm:gap-3 max-sm:hidden">
              <button
                className={`btn  ${viewMode === "grid" ? "active" : "hover"}`}
                onClick={() => setViewMode("grid")}
              >
                Grid
              </button>
              <button
                className={`btn  ${viewMode === "list" ? "active" : "hover"}`}
                onClick={() => setViewMode("list")}
              >
                List
              </button>
            </div>
          </div>
          <div
            className={`${
              viewMode === "grid"
                ? "grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr"
                : "space-y-4"
            }`}
          >
            {diplayedCoins.map((coin, key) => (
              <CoinCard coin={coin} key={key} />
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};
