import { GetServerSideProps } from "next";
import { getSearch } from "../../controllers/getSearch";
import { connectDB } from "../../config/db";
import { PropertyListing } from "../../types/listing";
import PropertyCard from "../../components/PropertyCard";

// Retrieve listings from Domain
export const searchPOST = async (searchObj: string): Promise<PropertyListing[]> => {
  const response = await fetch(`https://api.domain.com.au/v1/listings/residential/_search?api_key=${process.env.DOMAIN_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: searchObj,
  });

  if (!response.ok) {
    console.log(response);
    throw new Error('Network response was not ok')
  }

  return response.json();
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  await connectDB();
  // Fetch data from external API
  let search;


  if (context.params?.id) {
    // Find search object in MongoDB
    const res = await getSearch(context.params.id as string);
    search = JSON.stringify(res);
  };

  const results = await searchPOST(search as string);

  // Pass data to the page via props
  return { props: { search, results } }
}

interface SearchProps {
  results: PropertyListing[];
};


const Search = ({ results }: SearchProps) => {
  console.log(results);


  if (results.length > 0) {
    return (
      <div>
        {results.map((property) => (
          <PropertyCard key={property.listing.id} property={property} />
        ))}
      </div>
    )
  } else {
    return (
      <div>No results</div>
    )
  }
}

export default Search