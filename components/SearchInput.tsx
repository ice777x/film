"use client";
import React from "react";
import useDebounce from "./useDebounce";
import Card from "./Card";
import {FilmProps} from "@/typings";

export default function SearchInput() {
  const [search, setSearch] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const debouncedValue = useDebounce(search, 500);

  const handleInputChange = (e: any) => {
    setSearch(e.target.value);
  };
  React.useEffect(() => {
    if (debouncedValue === "") return setResults([]);
    async function fetchData() {
      setLoading(true);
      const data = await fetch(
        `https://fx.vercel.app/api/film?query=${debouncedValue}&page=1`
      );
      const resp = await data.json();
      setResults(resp.data);
      setLoading(false);
    }
    if (debouncedValue) fetchData();
  }, [debouncedValue]);
  return (
    <div>
      <div className="flex justify-center">
        <input
          type="text"
          onChange={handleInputChange}
          className="rounded-md bg-neutral-700 opacity-90 text-neutral-200 px-4 py-2 outline-none hover:ring-2 focus:ring-2 ring-neutral-500 caret-neutral-500 transition-all duration-200 ease-linear mb-9 w-full max-w-sm lg:max-w-lg"
          placeholder="Search"
        />
      </div>
      {loading && <p className="text-neutral-300 text-lg">Loading...</p>}
      {results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {results.map((item: FilmProps, i: number) => {
            return (
              <div key={i} className="flex gap-2">
                <Card
                  image={item.img}
                  title={item.title}
                  year={item.year}
                  url={item.link}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
