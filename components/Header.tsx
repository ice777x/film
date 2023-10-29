import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="py-4 flex gap-4">
        <Link href="/">
          <span className="text-xl font-bold text-gray-400 hover:text-white transition-colors duration-300">
            Home
          </span>
        </Link>
        <Link href="/film">
          <span className="text-xl font-bold text-gray-400 hover:text-white transition-colors duration-300">
            Film
          </span>
        </Link>
      </div>
    </header>
  );
}
