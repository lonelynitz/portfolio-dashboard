import { portfolioSymbols } from "@/common/constant";
import HomePage from "@/modules/home";
import axios from "axios";

export default function Home(props:any) {
  return (
    <HomePage {...props}/>      
  )
}

export const getServerSideProps = async () => {
  try {
    const response = await axios.get(process.env.STOCK_NEWS_API_URL as string, {
      params: {
        symbols: portfolioSymbols.join(","),
        api_token: process.env.STOCK_NEWS_API,
      },
    });
    return {
      props: { stockNews: response?.data ?? [] },
    };
  } catch (error) {
    return {
      props: { stockNews : [] },
    };
  }
};