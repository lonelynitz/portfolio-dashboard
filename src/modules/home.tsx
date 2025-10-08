import { api } from "@/common/api";
import { Header } from "@/common/header";
import useDebounce from "@/common/useDebounce";
import {
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import moment from "moment";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";

const HomePage = (props: any) => {
  const data = props?.stockNews?.data;
  const [searchText, setSearchText] = useState("");
  const [searchQuotes, setSearchQuotes] = useState([]);

  useDebounce({
    initialValue: searchText,
    debounce: 300,
    onChange: (e) => {
      handleSearchStocks(e);
    },
  });

  const NavList = [
    { label: "Home", navigate: "/" },
    { label: "Portfolio", navigate: "/portfolio" },
    { label: "News", navigate: "/news" },
    { label: "SignIn/SignUp", navigate: "/login" },
  ];

  const handleSearchStocks = async (searchValue: string) => {
    if (!searchValue) return;
    try {
      const { data } = await api.get(`api/search?stock=${searchValue}`);
      setSearchQuotes(data.quotes);
    } catch (error) {
      console.error("Error while searching stock", error);
    }
  };


  return (
    <>
      <Header navList={NavList} />
      <section className="flex justify-center items-center py-6">
        <TextField
          variant="outlined"
          value={searchText}
          className="w-full max-w-xl px-5 py-3 rounded-md shadow-md border border-gray-300"
          placeholder="Search for stocks and more..."
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            endAdornment: (
              <>
                {searchText && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setSearchText("")}
                      edge="end"
                      size="small"
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                )}
              </>
            ),
          }}
        >
          {searchQuotes.map((option:any) => (
            <MenuItem>
              {option.shortname}
            </MenuItem>
          ))}
        </TextField>
      </section>
      <article className="mt-6 ml-8">
        <p className="text-lg font-medium">News</p>
        {data?.map((news: any) => {
          const symbol = news?.entities?.map(
            (entries: { symbol: string }) => entries?.symbol
          )?.[0];
          return (
            <div className="flex items-start p-2 max-w-2xl">
              <img
                src={news.image_url}
                className="w-48 h-32 object-cover mr-4"
              />
              <div className="font-medium ml-4">
                <p className="text-xl">{news.title}</p>
                <p className="text-xs text-gray-500 mt-1">
                  <a href={news.url}>{news.source}</a> ({symbol}){" "}
                  {moment(news.published_at).format("DD-MMM-YY HH:mm")}
                </p>
              </div>
            </div>
          );
        })}
      </article>
    </>
  );
};

export default HomePage;
