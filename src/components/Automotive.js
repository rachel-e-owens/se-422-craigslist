import React, { useState, useEffect } from 'react';
import '../App.css';
import { API, Storage } from 'aws-amplify';
import { listAutomotives } from '../graphql/queries';
import { createAutomotive as createAutomotiveMutation, deleteAutomotive as deleteAutomotiveMutation } from '../graphql/mutations';

const initialFormState = { 
  posting_title: '',
  location: '', 
  city: '',
  phone: ''
}

function Automotive() {
  const [automotives, setAutomotive] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchAutomotive();
  }, []);

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchAutomotive();
  }

  async function fetchAutomotive() {
    const apiData = await API.graphql({ query: listAutomotives });
    console.log(apiData);
    const automotivesFromAPI = apiData.data.listAutomotives.items;
    await Promise.all(automotivesFromAPI.map(async automotive => {
      if (automotive.image) {
        const image = await Storage.get(automotive.image);
        automotive.image = image;
      }
      return automotive;
    }))
    console.log(apiData.data.listAutomotives.items);
    setAutomotive(apiData.data.listAutomotives.items);
  }

  async function updateFormData() {
    formData.phone = Number(formData.phone);
  }

  async function createAutomotive() {
    if ( !formData.posting_title || !formData.location || !formData.city || !formData.phone) return;
    updateFormData();
    await API.graphql({ query: createAutomotiveMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setAutomotive([ ...automotives, formData ]);
    setFormData(initialFormState);
    console.log(formData);
  }

  async function deleteAutomotive({ id }) {
    const newAutomotiveArray = automotives.filter(automotive => automotive.id !== id);
    console.log(newAutomotiveArray);
    setAutomotive(newAutomotiveArray);
    await API.graphql({ query: deleteAutomotiveMutation, variables: { input: { id } }});
  }

  return (
    <div className="Automotive">
      <h1>Automotive Services</h1>
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
        onChange={e => setFormData({ ...formData, 'location': e.target.value})}
        placeholder="Location"
        value={formData.location}
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
      <button onClick={createAutomotive}>Add Automotive Service</button>
      <div style={{marginBottom: 30}}>
        {
          automotives.map(automotive => (
            <div key={automotive.id}>
              <h2>{automotive.posting_title}</h2>
              <p> Location: {automotive.location} </p>
              <p> City: {automotive.city}</p>
              <p> Contact Phone #: {automotive.phone}</p>
              {
                automotive.image && <img src={automotive.image} style={{width: 400}} />
              }
              <p><button onClick={() => deleteAutomotive(automotive)}>Delete Service</button></p>
              <hr></hr>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Automotive;
