import Card from "@/components/Card";
import FilmNavigation from "@/components/FilmNavigation";
import {FilmProps} from "@/typings";
import Image from "next/image";

async function getFilms(id = 1) {
  const response = await fetch("https://fx.vercel.app/api/film?page=" + id, {
    cache: "no-cache",
  });
  const data = await response.json();
  return data;
}

export default async function Home({params}: {params: {page: string}}) {
  const films = await getFilms(Number(params.page));
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {films.films.map((film: FilmProps, i: number) => {
          return (
            <section key={i} className="">
              <Card
                // key={i}
                title={film.title}
                image={film.img}
                url={film.link}
                year={film.year}
              />
            </section>
          );
        })}
      </div>
      <div className="py-4">
        <FilmNavigation pages={films.nav} />
      </div>
    </div>
  );
}
