import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchChartData, fetchCoinDetails } from "../api/fetchCoins";
import { Navbar } from "../components/Navbar";
import { ArrowLeft } from "lucide-react";
import { formatMarketCap } from "../utils/formatter";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Footer } from "../components/Footer";
import { Loader } from "../components/Loader";

export const CoinDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [chartData, setChartData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCoinData = async () => {
      setLoading(true);
      try {
        const result = await fetchCoinDetails(id);
        setData(result);
      } catch (err) {
        console.log("something went wrong while fetching coin details", err);
      } finally {
        setLoading(false);
      }
    };
    const getChartData = async () => {
      try {
        const result = await fetchChartData(id);
        const formattedData = result.prices.map((price) => ({
          time: new Date(price[0]).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          price: price[1].toFixed(2),
        }));

        setChartData(formattedData);
      } catch (err) {
        console.log("something went wrong while fetching chart data", err);
      }
    };
    getCoinData();
    getChartData();
  }, [id]);

  if (!data)
    return (
      <Loader>
        <button
          className="max-sm:fixed max-sm:top-5 max-sm:left-5 max-sm:p-2 max-sm:rounded-full btn bg-secondary/20 flex gap-2 items-center"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={18} />
          <span className="hidden sm:block">back to list</span>
        </button>
      </Loader>
    );

  const marketCap = formatMarketCap(data.market_data.market_cap.usd);
  const volume = formatMarketCap(data.market_data.total_volume.usd);
  const totalSupply = data.market_data.total_supply.toFixed(2);
  const circulatingSupply = data.market_data.circulating_supply.toFixed(2);
  return (
    <div className="min-h-screen relative">
      <Navbar
        child={
          <button
            className="max-sm:fixed max-sm:top-5 max-sm:left-5 max-sm:p-2 max-sm:rounded-full btn bg-secondary/20 flex gap-2 items-center"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:block">back to list</span>
          </button>
        }
      />
      <div className="container mx-auto py-5 sm:py-10 px-8 sm:px-16">
        <div className="flex justify-between mb-6">
          <div className="flex gap-4">
            <div className="p-1 rounded-full border border-border">
              <img className="w-16" src={data.image.large} />
            </div>

            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl font-semibold">
                {data.name}
              </h1>
              <p className="text-muted">{data.symbol.toUpperCase()}</p>
            </div>
          </div>
          <div>
            <span className="rank sm:text-lg">
              Rank #{data.market_cap_rank}
            </span>
          </div>
        </div>

        <div className="p-8 rounded-2xl my-4 border border-border">
          <h1 className="text-4xl font-bold">
            ${data.market_data.current_price.usd}
          </h1>

          <span
            className={`flex w-fit items-center gap-2 my-8 p-4  ${
              data.market_data.price_change_percentage_24h <= 0 ? "dec" : "inc"
            } `}
          >
            {data.market_data.price_change_percentage_24h <= 0 ? (
              <span className="text-xs ">▼</span>
            ) : (
              <span className="text-xs ">▲</span>
            )}
            {data.market_data.price_change_percentage_24h < 0.1
              ? Math.abs(data.market_data.price_change_percentage_24h).toFixed(
                  8
                )
              : Math.abs(data.market_data.price_change_percentage_24h).toFixed(
                  2
                )}
            %
          </span>

          <div className="flex gap-8  ">
            <div className="space-y-1 ">
              <p className="text-muted text-xs">24h High</p>
              <span className="inline-block text-xl font-bold">
                ${formatMarketCap(data.market_data.high_24h.usd)}
              </span>
            </div>

            <div className="space-y-1 ">
              <p className="text-muted text-xs">24h Low</p>
              <span className="inline-block text-xl font-bold">
                ${formatMarketCap(data.market_data.low_24h.usd)}
              </span>
            </div>
          </div>
        </div>

        <div className="my-8 rounded-2xl p-8 border border-border">
          <h1 className="text-2xl sm:text-3xl mb-6">Price Chart (7 Days)</h1>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray={"5 5"}
                stroke="rgba(255, 255, 255, 0.1)"
              />
              <YAxis dataKey={"price"} domain={["auto", "auto"]} />
              <XAxis dataKey={"time"} />
              <Line
                dataKey={"price"}
                type={"monotone"}
                stroke="#add8e6"
                strokeWidth={2}
                dot={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.1) ",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-sm:text-center mb-10">
          <div className="p-5 border border-border space-y-2 rounded-xl">
            <h1 className="text-muted">Market Cap</h1>
            <p className="font-bold text-2xl">${marketCap}</p>
          </div>
          <div className="p-5 border border-border space-y-2 rounded-xl">
            <h1 className="text-muted">Volume (24)</h1>
            <p className="font-bold text-2xl">${volume}</p>
          </div>
          <div className="p-5 border border-border space-y-2 rounded-xl">
            <h1 className="text-muted">Circulating Supply</h1>
            <p className="font-bold text-2xl">{circulatingSupply}</p>
          </div>
          <div className="p-5 border border-border space-y-2 rounded-xl">
            <h1 className="text-muted">Total Supply</h1>
            <p className="font-bold text-2xl">{totalSupply}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
