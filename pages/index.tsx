import { getSearches } from "../controllers/getSearches";
import { GetServerSideProps } from "next";
import SearchesList from "../components/SearchesList";
import { connectDB } from "../config/db";
import * as React from 'react';
import { useState } from "react";
import { SearchParams, Locations } from "../types/searchParams";

export const getServerSideProps: GetServerSideProps = async () => {
  await connectDB();

  // Fetch data from external API
  const res = await getSearches();
  const searchesJSON = JSON.stringify(res);

  // Pass data to the page via props
  return { props: { searches: searchesJSON } }
}

interface HomeProps {
  searches: string;
}

const searchPOST = async (searchObj: string): Promise<SearchParams> => {
  const response = await fetch(`http://localhost:3000/api/search`, {
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

  console.log(response);

  return response.json();
};

const Home = ({ searches }: HomeProps) => {
  const [formData, setFormData] = React.useState<SearchParams>({
    name: "",
    listingType: "Sale",
    minBedrooms: 0,
    minBathrooms: 0,
    minCarspaces: 0,
    maxPrice: 5000000,
    minLandArea: 0,
    maxLandArea: 10000,
    locations: [],
  });

  const [address, setAddress] = React.useState<Locations>({
    suburb: "",
    state: ""
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  };

  const handleRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'sale') {
      setFormData((prevState) => ({
        ...prevState,
        listingType: "Sale",
      }))
    } else {
      setFormData((prevState) => ({
        ...prevState,
        listingType: "Rent",
      }))
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.locations.length === 0) {
      alert('Must enter at least one location');
    } else {
      // Submit form
      try {
        await searchPOST(JSON.stringify(formData));
      } catch (error) {
        console.log(error);
      }
      // setFormData({
      //   name: "",
      //   listingType: "Sale",
      //   minBedrooms: 0,
      //   minBathrooms: 0,
      //   minCarspaces: 0,
      //   maxPrice: 0,
      //   minLandArea: 0,
      //   maxLandArea: 0,
      //   locations: [],
      // })
    }
  }

  const handleAddressSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (address.state === "" || address.suburb === "") {
      alert('Must enter all location details')
    } else {
      const newLocations = formData.locations;
      newLocations.push({
        ...address,
      })
      setFormData((prevState) => ({
        ...prevState,
        locations: newLocations,
      }));
      setAddress({
        suburb: "",
        state: ""
      })
    }
  }

  return (
    <div>
      <section>
        <h2>Home</h2>
        {JSON.parse(searches).length > 0 ? (
          <SearchesList searches={JSON.parse(searches)} />
        ) : (
          <p>No saved searches</p>
        )}
      </section>
      <section>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="name">Search name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleFormChange} />
          </div>
          <div>
            <fieldset>
              <label htmlFor="sale">To buy</label>
              <input type="radio" id="sale" name="sale" checked={formData.listingType === "Sale" ? true : false} onChange={handleRadio} />
              <label htmlFor="rent">To rent</label>
              <input type="radio" id="rent" name="rent" checked={formData.listingType === "Rent" ? true : false} onChange={handleRadio} />
            </fieldset>
          </div>
          <div>
            <label htmlFor="minBedrooms">Min bedrooms</label>
            <input type="number" id="minBedrooms" name="minBedrooms" value={formData.minBedrooms} onChange={handleFormChange} />
          </div>
          <div>
            <label htmlFor="minBathrooms">Min bathrooms</label>
            <input type="number" id="minBathrooms" name="minBathrooms" value={formData.minBathrooms} onChange={handleFormChange} />
          </div>
          <div>
            <label htmlFor="minCarspaces">Min car spaces</label>
            <input type="number" id="minCarspaces" name="minCarspaces" value={formData.minCarspaces} onChange={handleFormChange} />
          </div>
          <div>
            <label htmlFor="maxPrice">Max price</label>
            <input type="number" id="maxPrice" name="maxPrice" value={formData.maxPrice} onChange={handleFormChange} />
          </div>
          <div>
            <label htmlFor="minLandArea">Min land size</label>
            <input type="number" id="minLandArea" name="minLandArea" value={formData.minLandArea} onChange={handleFormChange} />
          </div>
          <div>
            <label htmlFor="maxLandArea">Max land size</label>
            <input type="number" id="maxLandArea" name="maxLandArea" value={formData.maxLandArea} onChange={handleFormChange} />
          </div>
          <div>
            <fieldset>
              <legend>Location</legend>
              <label htmlFor="suburb">Suburb</label>
              <input type="text" id="suburb" name="suburb" value={address.suburb} onChange={handleAddressChange} />
              <label htmlFor="state">State</label>
              <input type="text" id="state" name="state" value={address.state} onChange={handleAddressChange} />
              <button type="button" onClick={handleAddressSubmit}>Add location</button>
            </fieldset>
          </div>
          <button type="submit">Create search</button>
        </form>
        <div>
          {formData.locations.length > 0 && formData.locations.map((location) => (
            <div key={location.suburb}>{location.suburb}. {location.state}</div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home;