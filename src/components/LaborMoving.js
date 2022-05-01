import React, { useState, useEffect } from 'react';
import '../App.css';
import { API, Storage } from 'aws-amplify';
import { listLaborMovings } from '../graphql/queries';
import { createLaborMoving as createLaborMovingMutation, deleteLaborMoving as deleteLaborMovingMutation } from '../graphql/mutations';

const initialFormState = { 
  posting_title: '',
  type: '', 
  location: '', 
  city: '',
  phone: ''
}

function LaborMoving() {
  const [labors, setLaborMoving] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchLaborMoving();
  }, []);

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchLaborMoving();
  }

  async function fetchLaborMoving() {
    const apiData = await API.graphql({ query: listLaborMovings });
    console.log(apiData);
    const laborsFromAPI = apiData.data.listLaborMovings.items;
    await Promise.all(laborsFromAPI.map(async labor => {
      if (labor.image) {
        const image = await Storage.get(labor.image);
        labor.image = image;
      }
      return labor;
    }))
    console.log(apiData.data.listLaborMovings.items);
    setLaborMoving(apiData.data.listLaborMovings.items);
  }

  async function updateFormData() {
    formData.phone = Number(formData.phone);
  }

  async function createLaborMoving() {
    console.log(formData);
    if ( !formData.posting_title || !formData.type || !formData.location || !formData.city || !formData.phone) return;
    updateFormData();
    console.log(formData);
    await API.graphql({ query: createLaborMovingMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setLaborMoving([ ...labors, formData ]);
    setFormData(initialFormState);
    console.log(formData);
  }

  async function deleteLaborMoving({ id }) {
    const newLaborMovingArray = labors.filter(labor => labor.id !== id);
    console.log(newLaborMovingArray);
    setLaborMoving(newLaborMovingArray);
    await API.graphql({ query: deleteLaborMovingMutation, variables: { input: { id } }});
  }

  return (
    <div className="LaborMoving">
      <h1>Labor & Moving Services</h1>
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
        value={formData.location }
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
      <button onClick={createLaborMoving}>Add New LaborMoving Service</button>
      <div style={{marginBottom: 30}}>
        {
          labors.map(labor => (
            <div key={labor.id}>
              <h2>{labor.posting_title}</h2>
              <p> Type of Service: {labor.type} </p>
              <p> Location: {labor.location}</p>
              <p> City: {labor.city}</p>
              <p> Contact Phone #: {labor.phone}</p>
              {
                labor.image && <img src={labor.image} style={{width: 400}} />
              }
              <p><button onClick={() => deleteLaborMoving(labor)}>Delete Service</button></p>
              <hr></hr>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default LaborMoving;
