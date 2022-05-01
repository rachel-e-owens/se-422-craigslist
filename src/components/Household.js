import React, { useState, useEffect } from 'react';
import '../App.css';
import { API, Storage } from 'aws-amplify';
import { listHouseholds } from '../graphql/queries';
import { createHousehold as createHouseholdMutation, deleteHousehold as deleteHouseholdMutation } from '../graphql/mutations';

const initialFormState = { 
  posting_title: '',
  type: '', 
  location: '', 
  city: '',
  phone: ''
}

function Household() {
  const [households, setHousehold] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchHousehold();
  }, []);

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchHousehold();
  }

  async function fetchHousehold() {
    const apiData = await API.graphql({ query: listHouseholds });
    console.log(apiData);
    const householdsFromAPI = apiData.data.listHouseholds.items;
    await Promise.all(householdsFromAPI.map(async household => {
      if (household.image) {
        const image = await Storage.get(household.image);
        household.image = image;
      }
      return household;
    }))
    console.log(apiData.data.listHouseholds.items);
    setHousehold(apiData.data.listHouseholds.items);
  }

  async function updateFormData() {
    formData.phone = Number(formData.phone);
  }

  async function createHousehold() {
    console.log(formData);
    if ( !formData.posting_title || !formData.type || !formData.location || !formData.city || !formData.phone) return;
    updateFormData();
    console.log(formData);
    await API.graphql({ query: createHouseholdMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setHousehold([ ...households, formData ]);
    setFormData(initialFormState);
    console.log(formData);
  }

  async function deleteHousehold({ id }) {
    const newHouseholdArray = households.filter(household => household.id !== id);
    console.log(newHouseholdArray);
    setHousehold(newHouseholdArray);
    await API.graphql({ query: deleteHouseholdMutation, variables: { input: { id } }});
  }

  return (
    <div className="Household">
      <h1>Household Services</h1>
      <input
        type="file"
        onChange={onChange}
      />
    <input
        onChange={e => setFormData({ ...formData, 'posting_title': e.target.value})}
        placeholder="Posting Title"
        value={formData.posting_title}
      />
      <input
        onChange={e => setFormData({ ...formData, 'type': e.target.value})}
        placeholder="Type"
        value={formData.type}
      />
     <input
        onChange={e => setFormData({ ...formData, 'location': e.target.value})}
        placeholder="Location"
        value={formData.locatio }
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
      <button onClick={createHousehold}>Add New Household Service</button>
      <div style={{marginBottom: 30}}>
        {
          households.map(household => (
            <div key={household.id}>
              <h2>{household.posting_title}</h2>
              <p> Type of Service: {household.type} </p>
              <p> Location: {household.location}</p>
              <p> City: {household.city}</p>
              <p> Contact Phone #: {household.phone}</p>
              {
                household.image && <img src={household.image} style={{width: 400}} />
              }
              <p><button onClick={() => deleteHousehold(household)}>Delete Service</button></p>
              <hr></hr>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Household;
