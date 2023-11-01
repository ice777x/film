import Image from "next/image";
import Link from "next/link";

type CardProps = {
  title: string;
  image: string;
  url: string;
  year: string;
};
export default function Card({title, image, url, year}: CardProps) {
  const split_link = url.split("/");
  const id = split_link[split_link.length - 2];
  return (
    <div className="shadow flex group flex-col gap-1 text-center">
      <Link
        href={`/film/video?id=${id}`}
        rel="noopener noreferrer"
        className="flex-grow"
      >
        <div className="overflow-hidden rounded-lg">
          <Image
            src={image}
            alt={title}
            width={640}
            height={1080}
            quality={100}
            className="hover:scale-105 transition-all duration-300 ease-in-out object-center h-[280px]"
          />
        </div>
        <h1 className="font-bold">
          {title} ({year})
        </h1>
      </Link>
    </div>
  );
}
