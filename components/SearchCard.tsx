import Link from "next/link"
import { SearchParams } from "../types/searchParams";
import styles from '../styles/SearchCard.module.css';
import { useQuery } from 'react-query'

interface SearchCardProps {
  search: SearchParams;
}

const searchDelete = async (searchId: string): Promise<SearchParams> => {
  const response = await fetch(`http://localhost:3000/api/search/${searchId}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    console.log(response);
    throw new Error('Network response was not ok')
  }

  return response.json();
};


const SearchCard = ({ search }: SearchCardProps) => {
  return (
    <article className={styles.card}>
      <header>
        <h2><Link href={`/search/${search._id}`}><a className={styles.link}>{search.name ? (search.name) : ('Search')}</a></Link></h2>
        <button onClick={() => searchDelete(search._id as string)}>Delete</button>
      </header>
      <section>
        <div>
          <p>{search.listingType}</p>
          {search.maxPrice ? (
            <p>Up to ${search.maxPrice}</p>
          ) : (
            <p>Any price</p>
          )}
        </div>
        <div>
          {search.minBedrooms && <span>{search.minBedrooms}+ bedrooms</span>}
          {search.minBathrooms && <span>{search.minBathrooms}+ bathrooms</span>}
          {search.minCarspaces && <span>{search.minCarspaces}+ car spaces</span>}
          {(search.minLandArea && search.maxLandArea) && (
            <span>{search.minLandArea} - {search.maxLandArea}m2</span>
          )}
        </div>
      </section>
      <section>
        {search.locations.map((location) => (
          <p key={location.suburb}>{location.suburb}, {location.state}</p>
        ))}
      </section>
    </article>
  )
}

export default SearchCard