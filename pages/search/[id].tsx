import { GetServerSideProps } from "next";
import { getSearch } from "../../controllers/getSearch";
import { connectDB } from "../../config/db";
import { PropertyListing } from "../../types/listing";
import Image from "next/image";

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
        {results.map((result) => (
          // Property card component here
          <article key={result.listing.id}>
            <section>
              <Image src={result.listing.advertiser.bannerUrl} alt="" height={35} width={500} />
              <p>{result.listing.advertiser.contacts[0].name}</p>
              {result.listing.advertiser.contacts[0]?.photoUrl && (<Image height={50} width={50} alt="" src={result.listing.advertiser.contacts[0].photoUrl} />)}
            </section>
            <section>
              <Image src={result.listing.media[0].url} alt="" height={400} width={500} />
            </section>
            <section>
              <h2>{result.listing.priceDetails.displayPrice}</h2>
              <div>
                <p>{result.listing.propertyDetails.displayableAddress}</p>
                <p>{result.listing.propertyDetails.propertyType}</p>
              </div>
            </section>
          </article>
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