import Link from "next/link";
import { SearchParams } from "../types/searchParams";

interface SearchesListProps {
  searches: SearchParams[];
}

const SearchesList = ({ searches }: SearchesListProps) => {
  return (
    <>
      {searches.map((search) => (
        <article key={search.id}>
          <header>
            <h2><Link href={`/search/${search._id}`}><a>{search.name ? (search.name) : ('Search')}</a></Link></h2>

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
      ))}
    </>
  )
}

export default SearchesList