import {NextApiRequest} from "next";
import {NextResponse} from "next/server";
import cheerio, {CheerioAPI} from "cheerio";

async function getSource(url: string) {
  const response = await fetch(url);
  const data = await response.text();
  const s = data.split("var configs = {")[1].split(";")[0];
  const rex = /file: "(?<id>.*?)"/g;
  const m = rex.exec(s);
  return m?.groups?.id;
}
async function getVideo(id: string) {
  try {
    const response = await fetch(`https://hdfilmcehennemi.cx/${id}`);
    const res = await response.text();
    const $ = cheerio.load(res);
    const sources = $(".sources")
      .find("a,span")
      .map((i, el) => {
        return {
          url: $(el).attr("href"),
          title: $(el).text(),
        };
      })
      .toArray();
    const iframe = $("iframe").attr("src");
    const video = await getSource(iframe as string);
    const detail = await getVideoDetails($);
    return {video, sources, detail};
  } catch (e) {
    return [];
  }
}

async function getVideoDetails($: CheerioAPI) {
  const category = $("#listelements")
    .find(".elements")
    .map((i, el) => $(el).text().trim())
    .toArray()
    .splice(1);
  const desc = $("#film-aciklama").text().trim();
  const info = $("#filmbilgileri > .list-item")
    .map((i, el) => {
      const title = $(el).find("span").text().trim();
      const values = $(el)
        .find("a")
        .map((i, el) => $(el).text().trim())
        .toArray();
      return {title, values};
    })
    .toArray();
  const title = $(".singlecontent .title h1").text().trim();
  const en_title = $(".bolum-ismi").text().trim();
  const image = $(".film-afis img")
    .toArray()[0]
    .attribs.srcset.split(" ")
    .reverse()[1];
  const poster =
    $(".gallery-item a").length > 0 && $(".gallery-item a")[1].attribs.href;
  return {
    title: `${title} - ${en_title}`,
    image,
    poster: poster && `https://hdfilmcehennemi.cx${poster}`,
    desc,
    info,
    category,
  };
}
export async function GET(req: Request) {
  const {searchParams} = new URL(req.url);
  const id = searchParams.get("id") as string;
  const data = await getVideo(id);
  if (!data) {
    return NextResponse.next();
  }
  return NextResponse.json({
    message: "Video Source",
    data,
  });
}
