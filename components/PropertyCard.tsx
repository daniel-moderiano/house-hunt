import { PropertyListing } from "../types/listing";
import Image from 'next/image';
import styles from '../styles/PropertyCard.module.css';

interface PropertyCardProps {
  property: PropertyListing;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <article key={property.listing.id} className={styles.card}>
      <section>
        {property.listing.advertiser.bannerUrl && (
          <Image src={property.listing.advertiser.bannerUrl} alt="" height={35} width={500} />
        )}
        <p>{property.listing.advertiser.contacts[0].name}</p>
        {property.listing.advertiser.contacts[0]?.photoUrl && (<Image height={50} width={50} alt="" src={property.listing.advertiser.contacts[0].photoUrl} />)}
      </section>
      <section>
        <Image src={property.listing.media[0].url} alt="" height={400} width={500} />
      </section>
      <section>
        <h2>{property.listing.priceDetails.displayPrice}</h2>
        <div>
          <p>{property.listing.propertyDetails.displayableAddress}</p>
          <p>{property.listing.propertyDetails.propertyType}</p>
          <div className={styles.stats}>
            <p>{property.listing.propertyDetails.bedrooms} bed</p>
            <p>{property.listing.propertyDetails.bathrooms} bath</p>
            <p>{property.listing.propertyDetails.carspaces} car</p>
            {property.listing.propertyDetails.landArea && <p>{property.listing.propertyDetails.landArea} m2</p>}

          </div>
        </div>
      </section>
    </article>
  )
}

export default PropertyCard