"use client";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import ReactPlayer from "react-player";

export default function Home({params}: {params: {videoId: string}}) {
  const [data, setData] = useState<any>();
  const [id, setId] = useState<any>(params.videoId);
  const [current, setCurrent] = useState<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://fx.vercel.app/api/film/video?id=" + id,
        {
          cache: "no-cache",
        }
      );
      const data = await response.json();
      console.log(data);
      setData(data.data);
    };
    fetchData();
  }, [id]);
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
              return (
                <div key={i} className="">
                  <button
                    onClick={() => {
                      if (item.url) {
                        setCurrent(i);
                        setId(item.url.split("/").slice(3).join("/"));
                      }
                    }}
                    className={`px-3 py-2 rounded-lg text-gray-200 font-medium hover:bg-violet-600 transition-colors duration-200 ${
                      current == i ? "bg-violet-600" : "bg-neutral-800"
                    }`}
                  >
                    {item.lang}
                  </button>
                </div>
              );
            })}
          </div>
          <div className="player py-4 rounded-lg mb-9">
            <span className="text-neutral-400 text-sm font-medium font-mono">
              Active: {data.sources[current].lang}
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
