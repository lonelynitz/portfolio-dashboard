import { api } from "@/common/api";
import StockDetailsPage from "@/modules/stockDetails";

export default function StockDetails(props:any) {
    return(
       <StockDetailsPage {...props}/>
    )
}

export const getServerSideProps = async (props) => {
    const stockParam = props?.query?.stock
  try {
    const result = await api.get(`api/portfolio/stock?search=${stockParam}`)
    return {
      props : {
        stockDetails : result.data
      }
    }
  } catch (error) {
    return {
      props : {
        stockDetails : []
      }
    }
  }
};