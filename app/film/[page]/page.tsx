import Card from "@/components/Card";
import FilmNavigation from "@/components/FilmNavigation";
import Image from "next/image";

async function getFilms(id = 1) {
  const response = await fetch("http://localhost:3000/api/film?page=" + id, {
    cache: "no-cache",
  });
  const data = await response.json();
  return data;
}
type FilmProps = {
  title: string;
  description: string;
  img: string;
  link: string;
  year: string;
};

export default async function Home({params}: {params: {page: string}}) {
  const films = await getFilms(Number(params.page));
  return (
    <div>
      <div className="grid grid-cols-10 gap-6">
        {films.films.map((film: FilmProps, i: number) => {
          const split_link = film.link.split("/");
          const id = split_link[split_link.length - 2];
          return (
            <section key={i} className="col-span-2">
              <Card
                // key={i}
                title={film.title}
                image={film.img}
                url={id}
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
