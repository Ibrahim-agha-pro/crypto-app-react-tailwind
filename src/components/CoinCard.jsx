import { Link } from "react-router-dom";
import { formatMarketCap } from "../../../three-react-projcets/3-react-projects/crypto-project/src/utils/formatter";

export const CoinCard = ({ coin }) => {
  return (
    <div className="p-6 rounded-2xl border border-border hover hover:-translate-y-2 cursor-pointer">
      <Link to={`/coin/${coin.id}`}>
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 p-1 border overflow-hidden flex justify-center items-center border-border rounded-full">
            <img src={coin.image} />
          </div>

          <div className="space-y-3">
            <h1 className="text-xl font-semibold">{coin.name}</h1>
            <p className="text-muted">{coin.symbol}</p>
            <span className="rank">#{coin.market_cap_rank}</span>
          </div>
        </div>
        <h1 className="my-6 text-2xl font-bold ">
          $
          {coin.current_price < 0.01
            ? coin.current_price.toFixed(8)
            : coin.current_price.toFixed(2)}
        </h1>

        <span
          className={`flex w-fit items-center gap-2 ${
            coin.price_change_percentage_24h <= 0 ? "dec" : "inc"
          } `}
        >
          {coin.price_change_percentage_24h <= 0 ? (
            <span className="text-xs ">▼</span>
          ) : (
            <span className="text-xs ">▲</span>
          )}
          {coin.price_change_percentage_24h < 0.1
            ? Math.abs(coin.price_change_percentage_24h).toFixed(8)
            : Math.abs(coin.price_change_percentage_24h).toFixed(2)}
        </span>

        <div className="flex justify-between border-t mt-4 pt-2 border-border">
          <div className="space-y-1 ">
            <p className="text-muted text-xs">MARKET CAP</p>
            <span className="inline-block">
              ${formatMarketCap(coin.market_cap)}
            </span>
          </div>

          <div className="space-y-1 ">
            <p className="text-muted text-xs">VOLUME</p>
            <span className="inline-block">
              ${formatMarketCap(coin.total_volume)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};
