export interface Locations {
  state: string;
  suburb: string;
}

export interface SearchParams {
  id?: string;
  _id?: string;
  name?: string;
  listingType: string;
  minBedrooms?: number;
  minBathrooms?: number;
  minCarspaces?: number;
  maxPrice?: number;
  minLandArea?: number;
  maxLandArea?: number;
  locations: Locations[];
}