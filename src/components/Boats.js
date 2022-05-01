import React, { useState, useEffect } from 'react';
import '../App.css';
import { API, Storage } from 'aws-amplify';
import { listBoatss } from '../graphql/queries';
import { createBoats as createBoatsMutation, deleteBoats as deleteBoatsMutation } from '../graphql/mutations';

const initialFormState = { 
  build_year: '',
  make_manufacturer: '', 
  enginge_hours: '', 
  length: '', 
  model_name: '',
  model_number: '',
  propulsion_type: '',
  condition: '',
  price: '',
  city: '',
  phone: ''
}

function Boats() {
  const [boats, setBoats] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchBoats();
  }, []);

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchBoats();
  }

  async function fetchBoats() {
    const apiData = await API.graphql({ query: listBoatss });
    console.log(apiData);
    const boatsFromAPI = apiData.data.listBoatss.items;
    await Promise.all(boatsFromAPI.map(async boat => {
      if (boat.image) {
        const image = await Storage.get(boat.image);
        boat.image = image;
      }
      return boat;
    }))
    console.log(apiData.data.listBoatss.items);
    setBoats(apiData.data.listBoatss.items);
  }

  async function updateFormData() {
    formData.build_year = Number(formData.build_year);
    formData.enginge_hours = Number(formData.enginge_hours);
    formData.length = Number(formData.length);
    formData.model_number = Number(formData.model_number);
    formData.price = Number(formData.price);
    formData.phone = Number(formData.phone);
  }

  async function createBoats() {
    if (!formData.build_year || !formData.make_manufacturer || !formData.enginge_hours || 
        !formData.length || !formData.model_name || !formData.model_number || !formData.propulsion_type || !formData.condition ||
        !formData.price || !formData.city || !formData.phone ) return;
    updateFormData();
    console.log(formData);
    await API.graphql({ query: createBoatsMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setBoats([ ...boats, formData ]);
    setFormData(initialFormState);
    console.log(formData);
  }

  async function deleteBoats({ id }) {
    const newBoatsArray = boats.filter(boat => boat.id !== id);
    console.log(newBoatsArray);
    setBoats(newBoatsArray);
    await API.graphql({ query: deleteBoatsMutation, variables: { input: { id } }});
  }

  return (
    <div className="Boats">
      <h1>Boats</h1>
      <input
        type="file"
        onChange={onChange}
      />
    <input
        onChange={e => setFormData({ ...formData, 'build_year': e.target.value})}
        placeholder="Build Year"
        value={formData.build_year}
      />
      <input
        onChange={e => setFormData({ ...formData, 'make_manufacturer': e.target.value})}
        placeholder="Make / Manufacturer"
        value={formData.make_manufacturer}
      />
     <input
        onChange={e => setFormData({ ...formData, 'enginge_hours': e.target.value})}
        placeholder="Engine Hours"
        value={formData.enginge_hours}
      />
    <input
        onChange={e => setFormData({ ...formData, 'length': e.target.value})}
        placeholder="Length"
        value={formData.length}
      />
    <input
        onChange={e => setFormData({ ...formData, 'model_name': e.target.value})}
        placeholder="Model Name"
        value={formData.model_name}
      />
    <input
        onChange={e => setFormData({ ...formData, 'model_number': e.target.value})}
        placeholder="Model Number"
        value={formData.model_number}
    />
    <input
        onChange={e => setFormData({ ...formData, 'propulsion_type': e.target.value})}
        placeholder="Propulsion Type"
        value={formData.propulsion_type}
    />
    <input
        onChange={e => setFormData({ ...formData, 'condition': e.target.value})}
        placeholder="Condition"
        value={formData.condition}
      />
    <input
        onChange={e => setFormData({ ...formData, 'price': e.target.value})}
        placeholder="Price"
        value={formData.price}
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
      <button onClick={createBoats}>Add New Boat</button>
      <div style={{marginBottom: 30}}>
        {
          boats.map(boat => (
            <div key={boat.id}>
              <h2>{boat.make_manufacturer}</h2>
              <p> Year: {boat.build_year} </p>
              <p> Engine Hours: {boat.enginge_hours}</p>
              <p> Length: {boat.length}</p>
              <p> Model Name: {boat.model_name}</p>
              <p> Model Number: {boat.model_number} </p>
              <p> Propulsion Type: {boat.propulsion_type}</p>
              <p> Condition: {boat.condition}</p>
              <p> Price: {boat.price}</p>
              <p> City: {boat.city}</p>
              <p> Contact Phone #: {boat.phone}</p>
              {
                boat.image && <img src={boat.image} style={{width: 400}} />
              }
              <p><button onClick={() => deleteBoats(boat)}>Delete Boat</button></p>
              <hr></hr>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Boats;
