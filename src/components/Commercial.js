import React, { useState, useEffect, version } from 'react';
import '../App.css';
import { API, Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { getCommercial, listCommercials } from '../graphql/queries';
import { createCommercial as createCommercialMutation, deleteCommercial as deleteCommercialMutation } from '../graphql/mutations';
import { useNavigate } from "react-router-dom";

const initialFormState = { 
    sqft: '',
    handicap_accessible: '',
    rent: '',
    city: '',
    phone: ''
}

function Commercial() {
  const [Commercial, setCommercial] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchCommercial();
  }, []);

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchCommercial();
  }

  async function fetchCommercial() {
    const apiData = await API.graphql({ query: listCommercials });
    console.log(apiData);
    const CommercialFromAPI = apiData.data.listCommercials.items;
    await Promise.all(CommercialFromAPI.map(async commercial => {
      if (commercial.image) {
        const image = await Storage.get(commercial.image);
        commercial.image = image;
      }
      return commercial;
    }))
    console.log(apiData.data.listCommercials.items);
    setCommercial(apiData.data.listCommercials.items);
  }

  async function updateFormData() {
    formData.sqft = Number(formData.sqft);
    // TODO Check for multiple options (Yes, yes, Y) then change result on line 122
    formData.handicap_accessible = Boolean(formData.handicap_accessible);
    formData.rent = Number(formData.rent);
    formData.phone = Number(formData.phone);
  }

  async function createCommercial() {
    if (!formData.sqft || !formData.handicap_accessible || !formData.rent || !formData.city || !formData.phone) return;
    updateFormData();
    await API.graphql({ query: createCommercialMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setCommercial([ ...Commercial, formData ]);
    setFormData(initialFormState);
    console.log(formData);
  }

  async function deleteCommercial({ id }) {
    const newCommercialArray = Commercial.filter(commercial => commercial.id !== id);
    console.log(newCommercialArray);
    setCommercial(newCommercialArray);
    await API.graphql({ query: deleteCommercialMutation, variables: { input: { id } }});
  }

  return (
    <div className="Commercial">
      <h1>Commercial</h1>
      <input
        type="file"
        onChange={onChange}
      />
      <input
        onChange={e => setFormData({ ...formData, 'sqft': e.target.value})}
        placeholder="Sqft"
        value={formData.sqft}
      />
      <input
        onChange={e => setFormData({ ...formData, 'handicap_accessible': e.target.value})}
        placeholder="Handicap Accessible"
        value={formData.handicap_accessible}
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
      <button onClick={createCommercial}>Add New Commercial</button>
      <div style={{marginBottom: 30}}>
        {
          Commercial.map(commercial => (
            <div key={commercial.id}>
              <h2>{commercial.type}</h2>
              <p> Sqft: {commercial.sqft}</p>
              <p> Handicap Accessible: {commercial.handicap_accessible.toString()}</p>
              <p> Rent per Month: {commercial.rent}</p>
              <p> City: {commercial.city}</p>
              <p> Contact Phone #: {commercial.phone}</p>
              {
                commercial.image && <img src={commercial.image} style={{width: 400}} />
              }
              <p><button onClick={() => deleteCommercial(commercial)}>Delete Commercial</button></p>
              <hr></hr>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Commercial;
