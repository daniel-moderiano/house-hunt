interface Locations {
  state: string;
  suburb: string;
  includeSurroundingSuburbs: boolean;
}

export interface SearchParams {
  id?: string;
  listingType: string;
  minBedrooms?: number;
  maxBedrooms?: number;
  minBathrooms?: number;
  maxBathrooms?: number;
  minCarspaces?: number;
  maxCarspaces?: number;
  minPrice?: number;
  maxPrice?: number;
  minLandArea?: number;
  maxLandArea?: number;
  locations: Locations[];
  pageSize?: number;    // number of properties per page
  pageNumber?: number;    // page number of results (paginated on server side)
}