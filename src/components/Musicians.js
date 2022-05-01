import React, { useState, useEffect, version } from 'react';
import '../App.css';
import { API, Storage } from 'aws-amplify';
import { getMusicians, listMusicians } from '../graphql/queries';
import { createMusician as createMusiciansMutation, deleteMusician as deleteMusiciansMutation } from '../graphql/mutations';
import { useNavigate } from "react-router-dom";

const initialFormState = { 
  posting_title: '', 
  genre: '', 
  type: '', 
  city: '',
  phone: ''
}

function Musicians() {
  const [notes, setNotes] = useState([]);
  const [Musicians, setMusicians] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchMusicians();
  }, []);

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchMusicians();
  }

  async function fetchMusicians() {
    const apiData = await API.graphql({ query: listMusicians });
    console.log(apiData);
    const MusiciansFromAPI = apiData.data.listMusicians.items;
    await Promise.all(MusiciansFromAPI.map(async musician => {
      if (musician.image) {
        const image = await Storage.get(musician.image);
        musician.image = image;
      }
      return musician;
    }))
    console.log(apiData.data.listMusicians.items);
    setMusicians(apiData.data.listMusicians.items);
  }

  async function updateFormData() {
    formData.phone = Number(formData.phone);
  }

  async function createMusicians() {
    if (!formData.posting_title || !formData.genre || !formData.type || !formData.city || !formData.phone) return;
    updateFormData();
    await API.graphql({ query: createMusiciansMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setMusicians([ ...Musicians, formData ]);
    setFormData(initialFormState);
    console.log(formData);
  }

  async function deleteMusicians({ id }) {
    const newMusiciansArray = Musicians.filter(musician => musician.id !== id);
    console.log(newMusiciansArray);
    setMusicians(newMusiciansArray);
    await API.graphql({ query: deleteMusiciansMutation, variables: { input: { id } }});
  }

  return (
    <div className="Musicians">
      <h1>Musicians</h1>
      <input
        type="file"
        onChange={onChange}
      />
      <input
        onChange={e => setFormData({ ...formData, 'posting_title': e.target.value})}
        placeholder="Title"
        value={formData.posting_title}
      />
      <input
        onChange={e => setFormData({ ...formData, 'genre': e.target.value})}
        placeholder="Genre"
        value={formData.genre}
      />
    <input
        onChange={e => setFormData({ ...formData, 'type': e.target.value})}
        placeholder="Type"
        value={formData.type}
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
      <button onClick={createMusicians}>Add New Musician</button>
      <div style={{marginBottom: 30}}>
        {
          Musicians.map(musician => (
            <div key={musician.id}>
              <h2>{musician.posting_title}</h2>
              <p>genre: {musician.genre}</p>
              <p>type: {musician.type}</p>
              <p>city: {musician.city}</p>
              <p>phone: {musician.phone}</p>
              {
                musician.image && <img src={musician.image} style={{width: 400}} />
              }
              <p><button onClick={() => deleteMusicians(musician)}>Delete Musician</button></p>
              <hr></hr>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Musicians;
