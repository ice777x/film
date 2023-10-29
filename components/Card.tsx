import Image from "next/image";
import Link from "next/link";

type CardProps = {
  title: string;
  image: string;
  url: string;
  year: string;
};
export default async function Card({title, image, url, year}: CardProps) {
  return (
    <div className="shadow flex group flex-col gap-1 text-center">
      <Link
        href={`video/${url}`}
        rel="noopener noreferrer"
        className="flex-grow"
      >
        <div className="overflow-hidden rounded-xl">
          <Image
            src={image}
            alt={title}
            width={640}
            height={1080}
            quality={100}
            className="hover:scale-105 transition-all duration-300 ease-in-out object-cover h-[300px]"
          />
        </div>
        <h1 className="font-bold">
          {title} ({year})
        </h1>
      </Link>
    </div>
  );
}
