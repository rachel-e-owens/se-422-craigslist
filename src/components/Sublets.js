import React, { useState, useEffect, version } from 'react';
import '../App.css';
import { API, Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { getSublet, listSublets } from '../graphql/queries';
import { createSublet as createSubletMutation, deleteSublet as deleteSubletMutation } from '../graphql/mutations';
import { useNavigate } from "react-router-dom";

const initialFormState = { 
    housing_type: '', 
    private_room: '',
    private_bath: '',
    laundry: '',
    parking: '',
    handicap_accessible: '',
    animals: '',
    num_bedrooms: '',
    num_bathrooms: '',
    flooring: '',
    sqft: '',
    rent_period: '',
    rent: '',
    city: '',
    phone: ''
}

function Sublet() {
  const [Sublet, setSublet] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchSublet();
  }, []);

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchSublet();
  }

  async function fetchSublet() {
    const apiData = await API.graphql({ query: listSublets });
    console.log(apiData);
    const SubletFromAPI = apiData.data.listSublets.items;
    await Promise.all(SubletFromAPI.map(async sublet => {
      if (sublet.image) {
        const image = await Storage.get(sublet.image);
        sublet.image = image;
      }
      return sublet;
    }))
    console.log(apiData.data.listSublets.items);
    setSublet(apiData.data.listSublets.items);
  }

  async function updateFormData() {
    // TODO Check for multiple options (Yes, yes, Y) then change result on lines 187 - 192
    formData.private_room = Boolean(formData.private_room);
    formData.private_bath = Boolean(formData.private_bath);
    formData.laundry = Boolean(formData.laundry);
    formData.parking = Boolean(formData.parking);
    formData.handicap_accessible = Boolean(formData.handicap_accessible);
    formData.animals = Boolean(formData.animals);
    formData.num_bedrooms = Number(formData.num_bedrooms);
    formData.num_bathrooms = Number(formData.num_bathrooms);
    formData.sqft = Number(formData.sqft);
    formData.rent = Number(formData.rent);
    formData.phone = Number(formData.phone);
  }

  async function createSublet() {
    if ( !formData.housing_type || !formData.private_room || !formData.private_bath || !formData.laundry || !formData.parking || !formData.handicap_accessible || !formData.animals || !formData.num_bedrooms || !formData.num_bathrooms || !formData.flooring || !formData.sqft || !formData.rent_period || !formData.rent || !formData.city || !formData.phone) return;
    updateFormData();
    await API.graphql({ query: createSubletMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setSublet([ ...Sublet, formData ]);
    setFormData(initialFormState);
    console.log(formData);
  }

  async function deleteSublet({ id }) {
    const newSubletArray = Sublet.filter(sublet => sublet.id !== id);
    console.log(newSubletArray);
    setSublet(newSubletArray);
    await API.graphql({ query: deleteSubletMutation, variables: { input: { id } }});
  }

  return (
    <div className="Sublet">
      <h1>Sublet</h1>
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
        onChange={e => setFormData({ ...formData, 'private_room': e.target.value})}
        placeholder="Private Room"
        value={formData.private_room}
      />
      <input
        onChange={e => setFormData({ ...formData, 'private_bath': e.target.value})}
        placeholder="Private Bath"
        value={formData.private_bath}
      />
      <input
        onChange={e => setFormData({ ...formData, 'laundry': e.target.value})}
        placeholder="Laundry"
        value={formData.laundry}
      />
      <input
        onChange={e => setFormData({ ...formData, 'parking': e.target.value})}
        placeholder="Parking"
        value={formData.parking}
      />
      <input
        onChange={e => setFormData({ ...formData, 'handicap_accessible': e.target.value})}
        placeholder="Handicap Accessible"
        value={formData.handicap_accessible}
      />
      <input
        onChange={e => setFormData({ ...formData, 'animals': e.target.value})}
        placeholder="Animals"
        value={formData.animals}
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
        onChange={e => setFormData({ ...formData, 'rent_period': e.target.value})}
        placeholder="Rent Period"
        value={formData.rent_period}
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
      <button onClick={createSublet}>Add New Sublet</button>
      <div style={{marginBottom: 30}}>
        {
          Sublet.map(sublet => (
            <div key={sublet.id}>
              <h2>{sublet.housing_type}</h2>
              <p> Private Room Included: {sublet.private_room.toString()}</p>
              <p> Private Bath Included: {sublet.private_bath.toString()}</p>
              <p> Laundry Included: {sublet.laundry.toString()}</p>
              <p> Parking Included: {sublet.parking.toString()}</p>
              <p> Handicap Accessible: {sublet.handicap_accessible.toString()}</p>
              <p> Animals Allowed: {sublet.animals.toString()}</p>
              <p> # of Bedrooms: {sublet.num_bedrooms}</p>
              <p> # of Bathrooms: {sublet.num_bathrooms}</p>
              <p> Flooring: {sublet.flooring}</p>
              <p> Sqft: {sublet.sqft}</p>
              <p> Rent Period: {sublet.rent_period}</p>
              <p> Rent per Month: {sublet.rent}</p>
              <p> City: {sublet.city}</p>
              <p> Contact Phone #: {sublet.phone}</p>
              {
                sublet.image && <img src={sublet.image} style={{width: 400}} />
              }
              <p><button onClick={() => deleteSublet(sublet)}>Delete Sublet</button></p>
              <hr></hr>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Sublet;
