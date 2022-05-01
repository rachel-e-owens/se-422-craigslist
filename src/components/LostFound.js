import React, { useState, useEffect, version } from 'react';
import '../App.css';
import { API, Storage } from 'aws-amplify';
import { getLostFound, listLostFounds } from '../graphql/queries';
import { createLostFound as createLostFoundMutation, deleteLostFound as deleteLostFoundMutation } from '../graphql/mutations';
import { useNavigate } from "react-router-dom";

const initialFormState = { 
  posting_title: '', 
  lost: '', 
  found: '', 
  city: '',
  phone: ''
}

function LostFound() {
  const [lostFounds, setLostFound] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchLostFound();
  }, []);

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchLostFound();
  }

  async function fetchLostFound() {
    const apiData = await API.graphql({ query: listLostFounds });
    console.log(apiData);
    const lostFoundsFromAPI = apiData.data.listLostFounds.items;
    await Promise.all(lostFoundsFromAPI.map(async lostFound => {
      if (lostFound.image) {
        const image = await Storage.get(lostFound.image);
        lostFound.image = image;
      }
      return lostFound;
    }))
    console.log(apiData.data.listLostFounds.items);
    setLostFound(apiData.data.listLostFounds.items);
  }

  async function updateFormData() {
    if(formData.lost === 'yes' || formData.lost === 'true') 
        formData.lost = 1;
    else
        formData.lost = 0;
    if(formData.found === 'yes' || formData.found === 'true') 
        formData.found = 1;
    else
        formData.found = 0;
    formData.phone = Number(formData.phone);
  }

  async function createLostFound() {
    if (!formData.posting_title ||  !formData.lost || !formData.found || !formData.city || !formData.phone) return;
    updateFormData();
    await API.graphql({ query: createLostFoundMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setLostFound([ ...lostFounds, formData ]);
    setFormData(initialFormState);
    console.log(formData);
  }

  async function deleteLostFound({ id }) {
    const newLostFoundArray = lostFounds.filter(lostFound => lostFound.id !== id);
    console.log(newLostFoundArray);
    setLostFound(newLostFoundArray);
    await API.graphql({ query: deleteLostFoundMutation, variables: { input: { id } }});
  }

  return (
    <div className="LostFound">
      <h1>Lost and Found</h1>
      <input
        type="file"
        onChange={onChange}
      />
      <input
        onChange={e => setFormData({ ...formData, 'posting_title': e.target.value})}
        placeholder="Item Name"
        value={formData.posting_title}
      />
      <input
        onChange={e => setFormData({ ...formData, 'lost': e.target.value})}
        placeholder="Lost?"
        value={formData.lost}
      />
     <input
        onChange={e => setFormData({ ...formData, 'found': e.target.value})}
        placeholder="Found?"
        value={formData.found}
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
      <button onClick={createLostFound}>Add Item</button>
      <div style={{marginBottom: 30}}>
        {
          lostFounds.map(lostFound => (
            <div key={lostFound.id}>
              <h2>{lostFound.posting_title}</h2>
              <p>city: {lostFound.city}</p>
              <p>phone: {lostFound.phone}</p>
              <p>lost: {lostFound.lost == 1 ?  "yes": "no"}</p>
              <p>found: {lostFound.found == 1 ? "yes" : "no"}</p>
              {
                lostFound.image && <img src={lostFound.image} style={{width: 400}} />
              }
              <p><button onClick={() => deleteLostFound(lostFound)}>Delete Item</button></p>
              <hr></hr>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default LostFound;
