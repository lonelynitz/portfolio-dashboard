import { api } from "@/common/api";
import Portfolio from "@/modules/portfolio";
import axios from "axios";

export default function PortfolioPage(props:any) {
  return (
    <Portfolio {...props}/>
  );
}

export const getServerSideProps = async () => {
  try {
    const result = await api.get('api/portfolio')
    return {
      props : {
        portfolioList : result.data
      }
    }
  } catch (error) {
    return {
      props : {
        portfolioList : []
      }
    }
  }
};