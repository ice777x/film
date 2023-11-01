"use client";
import {FilmProps} from "@/typings";
import React, {useEffect, useState} from "react";
import Card from "./Card";
import Link from "next/link";
import Image from "next/image";
import FilmNavigation from "./FilmNavigation";

export default function TypeCard({type}: {type: string}) {
  const [data, setData] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await fetch(
        `https://fx.vercel.app/api/film?type=${type}&page=${page}`
      );
      const data = await res.json();
      setData(data);
      setLoading(false);
    }
    fetchData();
  }, [page]);
  return (
    <div className="">
      {loading && <p className="text-neutral-300 text-lg">Loading...</p>}
      {data && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {data.data.map((item: FilmProps, i: number) => {
            const split_link = item.link.split("/");
            const id = split_link[split_link.length - 2];
            return (
              <div
                key={i}
                className="shadow flex group flex-col gap-1 text-center"
              >
                <Link
                  href={`/film/video/${id}`}
                  rel="noopener noreferrer"
                  className="flex-grow"
                >
                  <div className="overflow-hidden rounded-lg mb-1">
                    <Image
                      priority
                      src={item.img}
                      alt={item.title}
                      width={640}
                      height={1080}
                      quality={100}
                      className="hover:scale-105 transition-all duration-300 ease-in-out object-center h-[240px]"
                    />
                  </div>
                  <h1 className="font-semibold text-sm">
                    {item.title} ({item.year})
                  </h1>
                </Link>
              </div>
            );
          })}
        </div>
      )}
      {data && (
        <div className="py-4">
          <div className="py-4 flex flex-wrap gap-4 justify-center">
            {data.nav.map((el: any, i: number) => {
              return (
                <React.Fragment key={i}>
                  {page > 1 && i == data.nav.length - 1 && (
                    <span className="bg-gray-900 py-1.5 px-3 rounded-lg">
                      ...
                    </span>
                  )}
                  <button
                    onClick={() => setPage(el.num)}
                    className={`${
                      el.num == page ? "bg-neutral-900" : "bg-gray-900"
                    } py-1.5 px-3 rounded-lg hover:bg-neutral-900 transition-all duration-200 font-medium `}
                  >
                    {el.text}
                  </button>
                  {page > 1 && i == 0 && (
                    <span className="bg-gray-900 py-1.5 px-3 rounded-lg">
                      ...
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
