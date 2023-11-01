import SearchInput from "@/components/SearchInput";
import TypeCard from "@/components/TypeCard";

export default function Home() {
  return (
    <div>
      <div className="mb-9">
        <h1 className="text-2xl w-max font-bold text-neutral-300 mb-7 hover:text-transparent bg-clip-text bg-gradient-to-b from-neutral-900 via-violet-600 to-violet-800 transition-colors duration-200">
          En Çok Beğenilen Filmler
        </h1>
        <TypeCard type="liked" />
      </div>
      <div className="">
        <h1 className="text-2xl w-max font-bold text-neutral-300 mb-7 hover:text-transparent bg-clip-text bg-gradient-to-b from-neutral-900 via-violet-600 to-violet-800 transition-colors duration-200 ">
          En Çok İzlenen Filmler
        </h1>
        <TypeCard type="view" />
      </div>
      {/* <SearchInput /> */}
    </div>
  );
}
