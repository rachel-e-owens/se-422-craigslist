import React, { useState, useEffect } from 'react';
import '../App.css';
import { API, Storage, Auth } from 'aws-amplify';
import { listCarsTruckss } from '../graphql/queries';
import { createCarsTrucks as createCarsTrucksMutation, deleteCarsTrucks as deleteCarsTrucksMutation } from '../graphql/mutations';

const initialFormState = { 
  make_model: '', 
  build_year: '', 
  color: '', 
  type: '', 
  condition: '',
  price: '',
  city: '',
  phone: ''
}

function CarsTrucks() {
  const [carsTrucks, setCarsTrucks] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchCarsTrucks();
  }, []);

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchCarsTrucks();
  }

  async function fetchCarsTrucks() {
    const apiData = await API.graphql({ query: listCarsTruckss });
    console.log(apiData);
    const carsTrucksFromAPI = apiData.data.listCarsTruckss.items;
    await Promise.all(carsTrucksFromAPI.map(async carTruck => {
      if (carTruck.image) {
        const image = await Storage.get(carTruck.image);
        carTruck.image = image;
      }
      return carTruck;
    }))
    console.log(apiData.data.listCarsTruckss.items);
    setCarsTrucks(apiData.data.listCarsTruckss.items);
  }

  async function updateFormData() {
    formData.build_year = Number(formData.build_year);
    formData.price = Number(formData.price);
    formData.phone = Number(formData.phone);
  }

  async function createCarsTrucks() {
    if (!formData.make_model || !formData.build_year || !formData.color || !formData.type || !formData.condition || !formData.price || !formData.city || !formData.phone) return;
    updateFormData();
    await API.graphql({ query: createCarsTrucksMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setCarsTrucks([ ...carsTrucks, formData ]);
    setFormData(initialFormState);
    console.log(formData);
  }

  async function deleteCarsTrucks({ id }) {
    const newCarsTrucksArray = carsTrucks.filter(carTruck => carTruck.id !== id);
    console.log(newCarsTrucksArray);
    setCarsTrucks(newCarsTrucksArray);
    await API.graphql({ query: deleteCarsTrucksMutation, variables: { input: { id } }});
  }

  return (
    <div className="CarsTrucks">
      <h1>Cars & Trucks</h1>
      <input
        type="file"
        onChange={onChange}
      />
      <input
        onChange={e => setFormData({ ...formData, 'make_model': e.target.value})}
        placeholder="Make and Model"
        value={formData.make_model}
      />
      <input
        onChange={e => setFormData({ ...formData, 'build_year': e.target.value})}
        placeholder="Build Year"
        value={formData.build_year}
      />
     <input
        onChange={e => setFormData({ ...formData, 'color': e.target.value})}
        placeholder="Color"
        value={formData.color}
      />
    <input
        onChange={e => setFormData({ ...formData, 'type': e.target.value})}
        placeholder="Type"
        value={formData.type}
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
      <button onClick={createCarsTrucks}>Add New Car or Truck</button>
      <div style={{marginBottom: 30}}>
        {
          carsTrucks.map(carTruck => (
            <div key={carTruck.id}>
              <h2>{carTruck.make_model}</h2>
              <p> Year: {carTruck.build_year}</p>
              <p> Color: {carTruck.color}</p>
              <p> Type: {carTruck.type}</p>
              <p> Condition: {carTruck.condition}</p>
              <p> Price: {carTruck.price}</p>
              <p> City: {carTruck.city}</p>
              <p> Contact Phone #: {carTruck.phone}</p>
              {
                carTruck.image && <img src={carTruck.image} style={{width: 400}} />
              }
              <p><button onClick={() => deleteCarsTrucks(carTruck)}>Delete Car or Truck</button></p>
              <hr></hr>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default CarsTrucks;
