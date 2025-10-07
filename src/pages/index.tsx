import { Header } from "@/common/header";
import useDebounce from "@/common/useDebounce";
import { useState } from "react";

export default function Home() {
  const [searchText, setSearchText] = useState("");

  useDebounce({
    initialValue: searchText,
    debounce: 300,
    onChange: (e) => {
      // setInputText(e);
    },
  })

  const NavList = [
    { label: "Home" , navigate : '/' },
    { label: "Portfolio",navigate : '/portfolio' },
    { label: "News",navigate : '/news',},
    { label: "SignIn/SignUp",navigate : '/login' },
  ];

  return (
    <>
      <Header navList={NavList}/>
      <section className="flex justify-center items-center py-6">
        <input
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          type="text"
          placeholder="Search for stocks and more"
          className="w-full max-w-xl px-5 py-3 rounded-md shadow-md border border-gray-300"
        />
      </section>
    </>
  );
}
