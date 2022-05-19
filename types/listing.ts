// Defines the complex Property Listing interface returned by the Domain.com.au API to avoid clutter in components

interface InspectionSchedule {
  byAppointment: boolean;
  recurring: boolean;
  times: {
    openingTime: string;
    closingTime: string;
  }[];
}

interface AuctionSchedule {
  time: string;
  auctionLocation: string;
}

interface Advertiser {
  type: string;
  id: number;
  name: string;
  logoUrl: string;
  preferredColourHex: string;
  bannerUrl: string;
  contacts: {
    name: string;
    photoUrl: string;
  }[];
}

interface PriceDetails {
  displayPrice: string;
}

interface Media {
  category: string;
  url: string;
}

interface PropertyDetails {
  state: string;
  features: string[];
  propertyType: string;
  allPropertyTypes: string[];
  bathrooms: number;
  bedrooms: number;
  carspaces: number;
  unitNumber: string;
  streetNumber: string;
  area: string;
  region: string;
  suburb: string;
  postcode: string;
  displayableAddress: string;
  latitude: number;
  longitude: number;
  landArea: number;
}

interface Listing {
  listingType: string;
  id: number;
  advertiser: Advertiser;
  priceDetails: PriceDetails;
  media: Media[];
  propertyDetails: PropertyDetails;
  headline: string;
  summaryDescription: string;
  hasFloorplan: boolean;
  hasVideo: boolean;
  labels: string[];
  auctionSchedule: AuctionSchedule;
  inspectionSchedule: InspectionSchedule;
  listingSlug: string;
}

export interface PropertyListing {
  type: string;
  listing: Listing;
}