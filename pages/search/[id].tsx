import { GetServerSideProps } from "next";
import { getSearch } from "../../controllers/getSearch";
import { SearchParams } from "../../types/searchParams";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API
  let search;


  if (context.params?.id) {
    // Find search object in MongoDB
    const res = await getSearch(context.params.id as string);
    search = JSON.stringify(res);
  };

  // Pass data to the page via props
  return { props: { search } }
}

interface SearchProps {
  search: SearchParams;
}

const Search = ({ search }: SearchProps) => {
  return (
    <div>Search</div>
  )
}

export default Search