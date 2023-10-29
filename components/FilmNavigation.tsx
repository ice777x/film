"use client";
import Link from "next/link";
import {usePathname, useSelectedLayoutSegment} from "next/navigation";
import {useState} from "react";

export default function FilmNavigation({pages}: {pages: any[]}) {
  const path = usePathname();
  return (
    <div className="py-4 flex gap-4 justify-center">
      {pages.map((el, i) => {
        return (
          <>
            {Number(path.split("/").pop()) > 1 && i == pages.length - 1 && (
              <span className="bg-gray-900 py-2 px-4 rounded-lg">...</span>
            )}
            <Link
              key={i}
              className={`${
                el.num == path.split("/").pop()
                  ? "bg-neutral-900"
                  : "bg-gray-900"
              } py-2 px-4 rounded-lg hover:bg-neutral-900 transition-all duration-200 font-medium `}
              href={`/film/${el.num}`}
            >
              {el.text}
            </Link>
            {Number(path.split("/").pop()) > 1 && i == 0 && (
              <span className="bg-gray-900 py-2 px-4 rounded-lg">...</span>
            )}
          </>
        );
      })}
    </div>
  );
}
