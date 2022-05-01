import React, { useState, useEffect } from 'react';
import '../App.css';
import { API, Storage } from 'aws-amplify';
import { listFurnitures } from '../graphql/queries';
import { createFurniture as createFurnitureMutation, deleteFurniture as deleteFurnitureMutation } from '../graphql/mutations';

const initialFormState = { 
  make_manufacturer: '',
  name: '', 
  condition: '', 
  price: '', 
  city: '',
  phone: ''
}

function Furniture() {
  const [furniture, setFurniture] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchFurniture();
  }, []);

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchFurniture();
  }

  async function fetchFurniture() {
    const apiData = await API.graphql({ query: listFurnitures });
    console.log(apiData);
    const furnitureFromAPI = apiData.data.listFurnitures.items;
    await Promise.all(furnitureFromAPI.map(async aFurniture => {
      if (aFurniture.image) {
        const image = await Storage.get(aFurniture.image);
        furniture.image = image;
      }
      return aFurniture;
    }))
    console.log(apiData.data.listFurnitures.items);
    setFurniture(apiData.data.listFurnitures.items);
  }

  async function updateFormData() {
    formData.price = Number(formData.price);
    formData.phone = Number(formData.phone);
  }

  async function createFurniture() {
    if ( !formData.make_manufacturer || !formData.name || !formData.condition || !formData.price || !formData.city || !formData.phone) return;
    updateFormData();
    await API.graphql({ query: createFurnitureMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setFurniture([ ...furniture, formData ]);
    setFormData(initialFormState);
    console.log(formData);
  }

  async function deleteFurniture({ id }) {
    const newFurnitureArray = furniture.filter(aFurniture => aFurniture.id !== id);
    console.log(newFurnitureArray);
    setFurniture(newFurnitureArray);
    await API.graphql({ query: deleteFurnitureMutation, variables: { input: { id } }});
  }

  return (
    <div className="Furniture">
      <h1>Furniture</h1>
      <input
        type="file"
        onChange={onChange}
      />
    <input
        onChange={e => setFormData({ ...formData, 'make_manufacturer': e.target.value})}
        placeholder="Make & Manufacturer"
        value={formData.make_manufacturer}
      />
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Name"
        value={formData.name}
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
      <button onClick={createFurniture}>Add New Furniture Item</button>
      <div style={{marginBottom: 30}}>
        {
          furniture.map(aFurniture => (
            <div key={aFurniture.id}>
              <h2>{aFurniture.name}</h2>
              <p> Make & Manufacturer: {aFurniture.make_manufacturer} </p>
              <p> Condition: {aFurniture.condition}</p>
              <p> Price: {aFurniture.price}</p>
              <p> City: {aFurniture.city}</p>
              <p> Contact Phone #: {aFurniture.phone}</p>
              {
                furniture.image && <img src={aFurniture.image} style={{width: 400}} />
              }
              <p><button onClick={() => deleteFurniture(aFurniture)}>Delete Furniture Item</button></p>
              <hr></hr>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Furniture;
