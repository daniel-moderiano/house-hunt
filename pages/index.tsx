import { getSearches } from "../controllers/getSearches";
import { GetServerSideProps } from "next";
import SearchesList from "../components/SearchesList";

export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch data from external API
  const res = await getSearches();
  const searchesJSON = JSON.stringify(res);

  // Pass data to the page via props
  return { props: { searches: searchesJSON } }
}

interface HomeProps {
  searches: string;
}

const Home = ({ searches }: HomeProps) => {

  return (
    <div>
      <h2>Home</h2>
      {JSON.parse(searches).length > 0 ? (
        <SearchesList searches={JSON.parse(searches)} />
      ) : (
        <p>No saved searches</p>
      )}
    </div>
  )
}

export default Home;