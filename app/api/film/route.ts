import type {NextApiRequest, NextApiResponse} from "next";
import cheerio from "cheerio";
import {NextResponse} from "next/server";

type ResponseData = {
  message: string;
};

async function getFilms(page: number = 1) {
  const response = await fetch(
    `https://hdfilmcehennemi.cx/film-arsivi-hd/page/${page}`
  );
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
    films: films,
    nav,
  };
}
async function getSearchFilms(query: string, page: number = 1) {
  const response = await fetch(
    `https://hdfilmcehennemi.cx/page/${page}/?s=${query}`
  );
  const data = await response.text();
  const $ = cheerio.load(data);
  const films = $(".movie-box")
    .map((i, el) => {
      const link = $(el).find("a").attr("href");
      const img = $(el).find("img").attr("data-src");
      const title = $(el).find(".film-ismi").text().trim();
      return {
        title,
        link,
        img,
      };
    })
    .toArray();
  const nav = $(".sayfalama")
    .find("strong, a")
    .map((i, el) => $(el).text())
    .toArray();
  return {
    films: films,
    nav,
  };
}

export async function GET(req: Request, res: Response) {
  const {searchParams} = new URL(req.url);
  const page = searchParams.get("page");
  const query = searchParams.get("query");
  if (query) {
    const films = await getSearchFilms(query, Number(page));
    return NextResponse.json(films);
  }
  const films = await getFilms(Number(page));
  return NextResponse.json(films);
}
