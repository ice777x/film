"use client";
import React, {useEffect, useState} from "react";
import ReactPlayer from "react-player";
import Image from "next/image";
import Link from "next/link";

export default function Home({searchParams}: {searchParams: {id: string}}) {
  const [data, setData] = useState<any>();
  const [id, setId] = useState<any>(searchParams.id);
  const [current, setCurrent] = useState<string>(searchParams.id);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://fx.vercel.app/api/film/video?id=" + current,
        {
          cache: "no-cache",
        }
      );
      const data = await response.json();
      setData(data.data);
    };
    fetchData();
  }, [searchParams.id]);
  return (
    <div>
      {data && (
        <div>
          <div className="mb-9">
            <h1 className="text-3xl font-bold text-gray-200 text-center">
              {data.detail.title}
            </h1>
          </div>
          <div className="mb-9 flex gap-4">
            {data.sources.map((item: any, i: number) => {
              const videoId = item.url
                .split("/")
                .slice(3)
                .join("/")
                .slice(0, -1);
              return (
                <div key={i} className="">
                  <Link
                    onClick={() => setCurrent(videoId)}
                    href={`/film/video?id=${videoId}`}
                    className={`px-3 py-2 rounded-lg text-gray-200 font-medium hover:bg-violet-600 transition-colors duration-200 ${
                      `https://hdfilmcehennemi.cx/${current}` == item.url
                        ? "bg-violet-600"
                        : "bg-neutral-800"
                    }`}
                  >
                    {item.lang}
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="player py-4 rounded-lg mb-9">
            <span className="text-neutral-400 text-sm font-medium font-mono">
              Active:{" "}
              {
                data.sources.find(
                  (item: any) =>
                    item.url == `https://hdfilmcehennemi.cx/${current}`
                )?.lang
              }
            </span>
            {data.video && (
              <ReactPlayer
                config={{
                  file: {
                    attributes: {
                      poster: data.detail.poster,
                    },
                    forceHLS: true,
                  },
                }}
                url={data.video}
                width={"100%"}
                height={"600px"}
                controls
              />
            )}
          </div>
          <div className="film grid grid-cols-4 gap-4">
            <div>
              <Image src={data.detail.image} width={300} height={400} alt="" />
            </div>
            <div className="col-span-3 space-y-1">
              <h1 className="text-2xl font-bold text-gray-200">
                {data.detail.title}
              </h1>
              <p className="text-gray-200 overflow-y-scroll line-clamp-[7] scrollbar-thin pr-2 scrollbar-thumb-neutral-800 scrollbar-track-neutral-700">
                {data.detail.desc}
              </p>
              <div className="space-y-1">
                {data.detail.info.map((item: any, i: number) => {
                  return (
                    <div key={i} className="flex gap-2">
                      <p className="text-gray-400 font-medium">{item.title}</p>
                      <p className="text-gray-200">{item.values.join(",")}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
