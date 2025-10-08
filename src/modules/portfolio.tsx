import { portfolioList } from "@/common/constant";
import { Header } from "@/common/header";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo } from "react";
import router from "next/router";

const columns = [
  { 
    accessorKey: "Column2", 
    header: "Particulars",
    cell: ({ getValue , row }) => {
      const stockName = getValue();
      const purchasePrice = row?.original?.Column3;
      
      if (purchasePrice) {
        return (
        <span 
          className="cursor-pointer"
          onClick={() => router.push(`/portfolio/${stockName}`)}
        >
          {stockName}
        </span>
      );
      }else{
        return <span>{stockName}</span>
      }
    }
  },
  { accessorKey: "Column3", header: "Purchase Price" },
  { accessorKey: "Column4", header: "Quantity" },
  { accessorKey: "Column5", header: "Investment" },
  { accessorKey: "calculatedPortfolioPercentage", header: "Portfolio (%)" },
  { accessorKey: "Column7", header: "NSE/BSE" },
  { accessorKey: "CMP", header: "CMP" },
  { accessorKey: "presentValue", header: "Present Value" },
  { 
    accessorKey: "gainLoss", 
    header: "Gain/Loss" ,
    cell: ({ getValue }) => {
      const value = parseFloat(getValue()) || 0;
      return (
        <span className={value >= 0 ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
          {value}
        </span>
      );
    }
  },
  { accessorKey: "peRadio", header: "P/E Ratio" },
  { accessorKey: "latestEarning", header: "Latest Earnings" },
];

const Portfolio = (props:any) => {

  const data = useMemo(() => {
    const list = portfolioList.filter(data => data?.Column2 !== undefined && data?.Column2 !== null)

    const totalInvestment = list.reduce((total, item) => {
    const investment = parseFloat(String(item.Column6)) || 0;
    return total + investment;
  }, 0);

  return list.map(item => {
    const investment = parseFloat(String(item.Column6)) || 0;
    const portfolioPercentage = totalInvestment > 0 ? (investment / totalInvestment) * 100 : 0;
    const matchedStocks = props?.portfolioList?.filter((list:{stockName:string}) => list.stockName === item.Column2)?.[0]

    return {
      ...item,
      CMP : matchedStocks?.cmp ?? '-',
      PresentValue : '-',
      gainLoss : matchedStocks?.gainLoss ?? '-',
      peRadio : matchedStocks?.peRatio ?? '-',
      latestEarning : matchedStocks?.latestEarnings ?? '-',
      presentValue : matchedStocks?.presentValue ?? '-',
      calculatedPortfolioPercentage: portfolioPercentage.toFixed(2) + '%'
    };
  });

  },[portfolioList])

  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("🔄 Refreshing portfolio data...");
      window.location.reload(); 
    }, 15000); 
    return () => clearInterval(interval); 
  }, []);

  return (
    <>
      <Header isNavigateBack title="Portfolio" />
      <main className="p-2 m-2">
        <div className="overflow-x-auto border border-gray-300 rounded-lg">
          <table className="min-w-full">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th key={header.id} className="px-3 py-2 text-xs font-medium text-gray-700 uppercase border-b whitespace-nowrap">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-3 py-2 text-sm border-b whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </main>
    </>
  );
};

export default Portfolio;
