import { SearchParams } from "../types/searchParams";
import SearchCard from "./SearchCard";

interface SearchesListProps {
  searches: SearchParams[];
};

const SearchesList = ({ searches }: SearchesListProps) => {
  return (
    <>
      {searches.map((search) => (
        <SearchCard key={search.id} search={search} />
      ))}
    </>
  )
}

export default SearchesList;