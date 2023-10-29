"use client";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import ReactPlayer from "react-player";

export default function Home({params}: {params: {videoId: string}}) {
  const [data, setData] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:3000/api/film/video?id=" + params.videoId,
        {
          cache: "no-cache",
        }
      );
      const data = await response.json();
      setData(data.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      {data && (
        <div>
          <div className="mb-9">
            <h1 className="text-3xl font-bold text-gray-200 text-center">
              {data.detail.title}
            </h1>
          </div>
          <div className="player py-4 rounded-lg mb-9">
            <ReactPlayer
              config={{
                file: {
                  attributes: {
                    poster: data.detail.poster,
                  },
                },
              }}
              url={data.video}
              width={"100%"}
              height={"600px"}
              controls
            />
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
                {data.detail.info.map((item: any) => {
                  return (
                    <div className="flex gap-2">
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
