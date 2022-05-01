import React, { useState, useEffect, version } from 'react';
import '../App.css';
import { API, Storage } from 'aws-amplify';
import { getAptHousing, listAptHousings} from '../graphql/queries';
import { createAptHousing as createAptHousingMutation, deleteAptHousing as deleteAptHousingMutation } from '../graphql/mutations';
import { useNavigate } from "react-router-dom";

const initialFormState = { 
  housing_type: '', 
  Laundry: '',
  Parking: '',
  animals: '',
  handicap_accessible: '',
  num_bedrooms: '',
  num_bathrooms: '',
  flooring: '',
  sqft: '',
  availability: '',
  rent: '',
  city: '',
  phone: ''
}

function AptHousing() {
  const [AptHousing, setAptHousing] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchAptHousing();
  }, []);

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchAptHousing();
  }

  async function fetchAptHousing() {
    const apiData = await API.graphql({ query: listAptHousings });
    console.log(apiData);
    const AptHousingFromAPI = apiData.data.listAptHousings.items;
    await Promise.all(AptHousingFromAPI.map(async aptHousing => {
      if (aptHousing.image) {
        const image = await Storage.get(aptHousing.image);
        aptHousing.image = image;
      }
      return aptHousing;
    }))
    console.log(apiData.data.listAptHousings.items);
    setAptHousing(apiData.data.listAptHousings.items);
  }

  async function updateFormData() {
    // TODO Check for multiple options (Yes, yes, Y) then change result on lines 174 - 177
    formData.Laundry = Boolean(formData.rent);
    formData.Parking = Boolean(formData.rent);
    formData.animals = Boolean(formData.rent);
    formData.handicap_accessible = Boolean(formData.rent);
    formData.num_bedrooms = Number(formData.rent);
    formData.num_bathrooms = Number(formData.rent);
    formData.sqft = Number(formData.sqft);
    formData.rent = Number(formData.rent);
    formData.phone = Number(formData.phone);
  }

  async function createAptHousing() {
    if (!formData.housing_type || !formData.Laundry || !formData.Parking || !formData.animals || !formData.handicap_accessible || !formData.num_bedrooms || !formData.num_bathrooms || !formData.flooring || !formData.sqft || !formData.availability || !formData.rent || !formData.city || !formData.phone) return;
    updateFormData();
    console.log(formData);
    await API.graphql({ query: createAptHousingMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setAptHousing([ ...AptHousing, formData ]);
    setFormData(initialFormState);
    console.log(formData);
  }

  async function deleteAptHousing({ id }) {
    const newAptHousingArray = AptHousing.filter(aptHousing => aptHousing.id !== id);
    console.log(newAptHousingArray);
    setAptHousing(newAptHousingArray);
    await API.graphql({ query: deleteAptHousingMutation, variables: { input: { id } }});
  }

  return (
    <div className="AptHousingForm">
      <h1>Apartments & Housing</h1>
      <input
        type="file"
        onChange={onChange}
      />
      <input
        onChange={e => setFormData({ ...formData, 'housing_type': e.target.value})}
        placeholder="Housing Type"
        value={formData.housing_type}
      />
      <input
        onChange={e => setFormData({ ...formData, 'Laundry': e.target.value})}
        placeholder="Laundry"
        value={formData.Laundry}
      />
      <input
        onChange={e => setFormData({ ...formData, 'Parking': e.target.value})}
        placeholder="Parking"
        value={formData.Parking}
      />
      <input
        onChange={e => setFormData({ ...formData, 'animals': e.target.value})}
        placeholder="Animals"
        value={formData.animals}
      />
      <input
        onChange={e => setFormData({ ...formData, 'handicap_accessible': e.target.value})}
        placeholder="Handicap Accessible"
        value={formData.handicap_accessible}
      />
      <input
        onChange={e => setFormData({ ...formData, 'num_bedrooms': e.target.value})}
        placeholder="# of Bedrooms"
        value={formData.num_bedrooms}
      />
      <input
        onChange={e => setFormData({ ...formData, 'num_bathrooms': e.target.value})}
        placeholder="# of Bathrooms"
        value={formData.num_bathrooms}
      />
      <input
        onChange={e => setFormData({ ...formData, 'flooring': e.target.value})}
        placeholder="Flooring"
        value={formData.flooring}
      />
      <input
        onChange={e => setFormData({ ...formData, 'sqft': e.target.value})}
        placeholder="Sqft"
        value={formData.sqft}
      />
      <input
        onChange={e => setFormData({ ...formData, 'availability': e.target.value})}
        placeholder="Availability"
        value={formData.availability}
      />
      <input
        onChange={e => setFormData({ ...formData, 'rent': e.target.value})}
        placeholder="Rent"
        value={formData.rent}
      />
      <input
        onChange={e => setFormData({ ...formData, 'city': e.target.value})}
        placeholder="City"
        value={formData.city}
      />
      <input
        onChange={e => setFormData({ ...formData, 'phone': e.target.value})}
        placeholder="Phone"
        value={formData.phone}
      />
      <button onClick={createAptHousing}>Add New Apartment or Housing</button>
      <div style={{marginBottom: 30}}>
        {
          AptHousing.map(aptHousing => (
            <div key={aptHousing.id}>
              <h2>{aptHousing.housing_type}</h2>
              <p> Laundry Included: {aptHousing.Laundry.toString()}</p>
              <p> Parking Included: {aptHousing.Parking.toString()}</p>
              <p> Animals Allowed: {aptHousing.animals.toString()}</p>
              <p> Handicap Accessible: {aptHousing.handicap_accessible.toString()}</p>
              <p> # of Bedrooms: {aptHousing.num_bedrooms}</p>
              <p> # of Bathrooms: {aptHousing.num_bathrooms}</p>
              <p> Flooring: {aptHousing.flooring}</p>
              <p> Sqft: {aptHousing.sqft}</p>
              <p> Availability: {aptHousing.availability}</p>
              <p> Rent per Month: {aptHousing.rent}</p>
              <p> City: {aptHousing.city}</p>
              <p> Contact Phone #: {aptHousing.phone}</p>
              {
                aptHousing.image && <img src={aptHousing.image} style={{width: 400}} />
              }
              <p><button onClick={() => deleteAptHousing(aptHousing)}>Delete Apartment or Housing</button></p>
              <hr></hr>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default AptHousing;
