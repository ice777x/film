import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="py-6 flex gap-4">
        <Link href="/">
          <span className="text-2xl font-bold text-gray-400 hover:text-transparent bg-clip-text bg-gradient-radial from-white via-neutral-400 to-neutral-950 transition-colors duration-300">
            Home
          </span>
        </Link>
        <Link href="/film">
          <span className="text-2xl font-bold text-gray-400 hover:text-transparent bg-clip-text bg-gradient-radial from-white via-neutral-400 to-neutral-950 transition-colors duration-300">
            Film
          </span>
        </Link>
      </div>
    </header>
  );
}
