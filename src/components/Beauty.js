import React, { useState, useEffect } from 'react';
import '../App.css';
import { API, Storage } from 'aws-amplify';
import { listBeautys } from '../graphql/queries';
import { createBeauty as createBeautyMutation, deleteBeauty as deleteBeautyMutation } from '../graphql/mutations';

const initialFormState = { 
  posting_title: '',
  type: '', 
  location: '', 
  city: '',
  phone: ''
}

function Beauty() {
  const [beauties, setBeauty] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchBeauty();
  }, []);

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchBeauty();
  }

  async function fetchBeauty() {
    const apiData = await API.graphql({ query: listBeautys });
    console.log(apiData);
    const beautiesFromAPI = apiData.data.listBeautys.items;
    await Promise.all(beautiesFromAPI.map(async beauty => {
      if (beauty.image) {
        const image = await Storage.get(beauty.image);
        beauty.image = image;
      }
      return beauty;
    }))
    console.log(apiData.data.listBeautys.items);
    setBeauty(apiData.data.listBeautys.items);
  }

  async function updateFormData() {
    formData.phone = Number(formData.phone);
  }

  async function createBeauty() {
    console.log(formData);
    if (!formData.posting_title || !formData.type || !formData.location || !formData.city || !formData.phone) return;
    updateFormData();
    console.log(formData);
    await API.graphql({ query: createBeautyMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setBeauty([ ...beauties, formData ]);
    setFormData(initialFormState);
    console.log(formData);
  }

  async function deleteBeauty({ id }) {
    const newBeautyArray = beauties.filter(beauty => beauty.id !== id);
    console.log(newBeautyArray);
    setBeauty(newBeautyArray);
    await API.graphql({ query: deleteBeautyMutation, variables: { input: { id } }});
  }

  return (
    <div className="Beauty">
      <h1>Beauty Services</h1>
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
      <button onClick={createBeauty}>Add New Beauty Service</button>
      <div style={{marginBottom: 30}}>
        {
          beauties.map(beauty => (
            <div key={beauty.id}>
              <h2>{beauty.posting_title}</h2>
              <p> Type of Service: {beauty.type} </p>
              <p> Location: {beauty.location}</p>
              <p> City: {beauty.city}</p>
              <p> Contact Phone #: {beauty.phone}</p>
              {
                beauty.image && <img src={beauty.image} style={{width: 400}} />
              }
              <p><button onClick={() => deleteBeauty(beauty)}>Delete Service</button></p>
              <hr></hr>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Beauty;
