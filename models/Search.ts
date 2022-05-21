import mongoose from "mongoose";
import { SearchParams } from "../types/searchParams";
const Schema = mongoose.Schema;

// Search schema reflect the typing of searchParams types defined in types/searchParams.ts
// The only required parameter is the search location - all other fields are optional
const searchSchema = new Schema<SearchParams>(
  {
    name: String,
    listingType: { type: String, enum: ['Sale', 'Rent'], default: 'Sale' },
    minBedrooms: Number,
    minBathrooms: Number,
    minCarspaces: Number,
    maxPrice: Number,
    minLandArea: Number,
    maxLandArea: Number,
    locations: {
      type: [{
        state: { type: String, required: true },
        suburb: { type: String, required: true },
      }], required: true
    }
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps automatically
    toJSON: { virtuals: true },   // Ensures res.json() provides the virtuals when this model is populated
    toObject: { virtuals: true },
  }
);

// Check for the existence of Search mongoose model and preferentially export this where possible to avoid trying to recreate the modeel (this throws an overwrite error)
export default mongoose.models.Search || mongoose.model<SearchParams>("Search", searchSchema);