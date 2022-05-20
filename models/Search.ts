import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Search schema reflect the typing of searchParams types defined in types/searchParams.ts
// The only required parameter is the search location - all other fields are optional
const searchSchema = new Schema(
  {
    listingType: { type: String, enum: ['Sale', 'Rent'], default: 'Sale' },
    minBedrooms: Number,
    maxBedrooms: Number,
    minBathrooms: Number,
    maxBathrooms: Number,
    minCarspaces: Number,
    maxCarspaces: Number,
    minPrice: Number,
    maxPrice: Number,
    minLandArea: Number,
    maxLandArea: Number,
    locations: {
      type: [{
        state: { type: String, required: true },
        suburb: { type: String, required: true },
        includeSurroundingSuburbs: { type: Boolean, required: true }
      }], required: true
    },
    pageSize: Number,   // number of properties per page
    pageNumber: Number,   // page number of results (paginated on server side)
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps automatically
    toJSON: { virtuals: true },   // Ensures res.json() provides the virtuals when this model is populated
    toObject: { virtuals: true },
  }
);

export const model = mongoose.model('Search', searchSchema);
