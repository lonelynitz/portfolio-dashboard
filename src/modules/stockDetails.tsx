import { Header } from "@/common/header";
import { useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const StockDetailsPage = (props: any) => {
  const {stock , news} = props.stockDetails;

  const {
    longName,
    symbol,
    fullExchangeName,
    currency,
    regularMarketPrice,
    regularMarketPreviousClose,
    regularMarketOpen,
    regularMarketDayHigh,
    regularMarketDayLow,
    regularMarketVolume,
    fiftyTwoWeekHigh,
    fiftyTwoWeekLow,
    trailingPE,
    epsTrailingTwelveMonths,
    priceToBook,
    dividendRate,
    dividendYield,
    fiftyDayAverage,
    twoHundredDayAverage,
    averageAnalystRating,
    marketState,
  } = stock;

  const gainLoss = regularMarketPrice - regularMarketPreviousClose;
  const gainLossPercent = (gainLoss / regularMarketPreviousClose) * 100;

  const chartData = [
    { time: "9 AM", price: regularMarketPreviousClose },
    { time: "10 AM", price: regularMarketPrice },
  ];

    useEffect(() => {
      const interval = setInterval(() => {
        console.log("🔄 Refreshing stock data...");
        window.location.reload(); 
      }, 15000); 
      return () => clearInterval(interval); 
    }, []);

  return (
    <>
      <Header isNavigateBack title="Stock Details" />
      <main className="m-4 p-4 space-y-4">
        <section>
          <h2 className="text-xl font-bold">{longName}</h2>
          <p className="text-gray-500">
            {symbol} - {fullExchangeName}
          </p>
          <p className="text-sm text-gray-400">Market State: {marketState}</p>

        </section>
                <section className="flex justify-center">
          <LineChart width={600} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="price" stroke="#8884d8" />
          </LineChart>
        </section>

        <section className="bg-gray-100 p-4 rounded-md space-y-2">
          <p className="text-lg">
            Current Market Price: <strong>{currency} {regularMarketPrice.toFixed(2)}</strong>
          </p>
          <p>
            Gain/Loss:{" "}
            <span className={gainLoss >= 0 ? "text-green-600" : "text-red-600"}>
              {gainLoss >= 0 ? "+" : ""}
              {gainLoss.toFixed(2)} ({gainLossPercent.toFixed(2)}%)
            </span>
          </p>
          <p>Previous Close: {currency} {regularMarketPreviousClose}</p>
          <p>Open: {currency} {regularMarketOpen}</p>
          <p>Day Range: {currency} {regularMarketDayLow} - {regularMarketDayHigh}</p>
        </section>

        <section className="bg-gray-100 p-4 rounded-md space-y-2">
          <p>52-Week Range: {currency} {fiftyTwoWeekLow} - {fiftyTwoWeekHigh}</p>
          <p>50-Day Avg: {currency} {fiftyDayAverage}</p>
          <p>200-Day Avg: {currency} {twoHundredDayAverage}</p>
        </section>

        <section className="bg-gray-100 p-4 rounded-md space-y-2">
          <p>Volume Today: {regularMarketVolume.toLocaleString()}</p>
          <p>Analyst Rating: {averageAnalystRating}</p>
        </section>

        <section className="bg-gray-100 p-4 rounded-md space-y-2">
          <p>P/E Ratio: {trailingPE}</p>
          <p>EPS: {epsTrailingTwelveMonths}</p>
          <p>Price to Book: {priceToBook}</p>
        </section>

        <section className="bg-gray-100 p-4 rounded-md space-y-2">
          <p>Dividend Rate: {dividendRate}</p>
          <p>Dividend Yield: {dividendYield}%</p>
        </section>
      </main>
    </>
  );
};

export default StockDetailsPage;
