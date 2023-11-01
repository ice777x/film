"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import React from "react";

export default function FilmNavigation({pages}: {pages: any[]}) {
  const path = usePathname();
  return (
    <div className="py-4 flex flex-wrap gap-4 justify-center">
      {pages.map((el, i) => {
        return (
          <React.Fragment key={i}>
            {Number(path.split("/").pop()) > 1 && i == pages.length - 1 && (
              <span className="bg-gray-900 py-1.5 px-3 rounded-lg">...</span>
            )}
            <Link
              className={`${
                el.num == path.split("/").pop()
                  ? "bg-neutral-900"
                  : "bg-gray-900"
              } py-1.5 px-3 rounded-lg hover:bg-neutral-900 transition-all duration-200 font-medium `}
              href={`/film/${el.num}`}
            >
              {el.text}
            </Link>
            {Number(path.split("/").pop()) > 1 && i == 0 && (
              <span className="bg-gray-900 py-1.5 px-3 rounded-lg">...</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
