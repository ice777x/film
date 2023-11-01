import type {NextApiRequest, NextApiResponse} from "next";
import cheerio from "cheerio";
import {NextResponse} from "next/server";

async function getFilms(url: string) {
  const response = await fetch(url);
  const data = await response.text();
  const $ = cheerio.load(data);
  const films = $(".movie-box")
    .map((i, el) => {
      const link = $(el).find("a").attr("href");
      const img = $(el).find("img").attr("data-src");
      const title = $(el).find(".film-ismi").text().trim();
      const year = $(el).find(".film-yil").text().trim();
      return {
        title,
        link,
        img,
        year,
      };
    })
    .toArray();
  const nav = $(".sayfalama")
    .find("strong,a")
    .map((i, el) => {
      const link = $(el).attr("href");
      return {
        text: $(el).text(),
        url: link,
        num: link
          ? link.split("/").reverse()[1] != "film-arsivi-hd"
            ? link.split("/").reverse()[1]
            : "1"
          : $(el).text(),
      };
    })
    .toArray();
  return {
    data: films,
    nav,
  };
}

export async function GET(req: Request, res: Response) {
  const {searchParams} = new URL(req.url);
  const page = searchParams.get("page");
  const query = searchParams.get("query");
  const type = searchParams.get("type");
  if (type) {
    if (type === "liked") {
      const films = await getFilms(
        `https://hdfilmcehennemi.cx/en-cok-begenilen-filmler-hd/page/${page}`
      );
      return NextResponse.json(films);
    } else if (type === "view") {
      const films = await getFilms(
        `https://hdfilmcehennemi.cx/en-cok-izlenen-filmler-hd/page/${page}`
      );
      return NextResponse.json(films);
    }
  }
  if (query) {
    const films = await getFilms(
      `https://hdfilmcehennemi.cx/page/${page}/?s=${query}`
    );
    return NextResponse.json(films);
  }

  const films = await getFilms(
    `https://hdfilmcehennemi.cx/film-arsivi-hd/page/${page}`
  );
  return NextResponse.json(films);
}
