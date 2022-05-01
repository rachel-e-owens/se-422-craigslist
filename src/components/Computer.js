import React, { useState, useEffect } from 'react';
import '../App.css';
import { API, Storage } from 'aws-amplify';
import { listComputers } from '../graphql/queries';
import { createComputer as createComputerMutation, deleteComputer as deleteComputerMutation } from '../graphql/mutations';

const initialFormState = { 
  posting_title: '',
  location: '', 
  city: '',
  phone: ''
}

function Computer() {
  const [computers, setComputer] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchComputer();
  }, []);

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchComputer();
  }

  async function fetchComputer() {
    const apiData = await API.graphql({ query: listComputers });
    console.log(apiData);
    const computersFromAPI = apiData.data.listComputers.items;
    await Promise.all(computersFromAPI.map(async computer => {
      if (computer.image) {
        const image = await Storage.get(computer.image);
        computer.image = image;
      }
      return computer;
    }))
    console.log(apiData.data.listComputers.items);
    setComputer(apiData.data.listComputers.items);
  }

  async function updateFormData() {
    formData.phone = Number(formData.phone);
  }

  async function createComputer() {
    console.log(formData);
    if ( !formData.posting_title || !formData.location || !formData.city || !formData.phone) return;
    updateFormData();
    console.log(formData);
    await API.graphql({ query: createComputerMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setComputer([ ...computers, formData ]);
    setFormData(initialFormState);
    console.log(formData);
  }

  async function deleteComputer({ id }) {
    const newComputerArray = computers.filter(computer => computer.id !== id);
    console.log(newComputerArray);
    setComputer(newComputerArray);
    await API.graphql({ query: deleteComputerMutation, variables: { input: { id } }});
  }

  return (
    <div className="Computer">
      <h1>Computer Services</h1>
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
      <button onClick={createComputer}>Add New Computer Service</button>
      <div style={{marginBottom: 30}}>
        {
          computers.map(computer => (
            <div key={computer.id}>
              <h2>{computer.posting_title}</h2>
              <p> Location: {computer.location}</p>
              <p> City: {computer.city}</p>
              <p> Contact Phone #: {computer.phone}</p>
              {
                computer.image && <img src={computer.image} style={{width: 400}} />
              }
              <p><button onClick={() => deleteComputer(computer)}>Delete Service</button></p>
              <hr></hr>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Computer;
