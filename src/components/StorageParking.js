import React, { useState, useEffect, version } from 'react';
import '../App.css';
import { API, Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { getStorageParking, listStorageParkings } from '../graphql/queries';
import { createStorageParking as createStorageParkingMutation, deleteStorageParking as deleteStorageParkingMutation } from '../graphql/mutations';
import { useNavigate } from "react-router-dom";

const initialFormState = { 
  type: '',
  handicap_accessible: '',
  rent: '',
  city: '',
  phone: ''
}

function StorageParking() {
  const [notes, setNotes] = useState([]);
  const [StorageParking, setStorageParking] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchStorageParking();
  }, []);

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchStorageParking();
  }

  async function fetchStorageParking() {
    const apiData = await API.graphql({ query: listStorageParkings });
    console.log(apiData);
    const StorageParkingFromAPI = apiData.data.listStorageParkings.items;
    await Promise.all(StorageParkingFromAPI.map(async storageParking => {
      if (storageParking.image) {
        const image = await Storage.get(storageParking.image);
        storageParking.image = image;
      }
      return storageParking;
    }))
    console.log(apiData.data.listStorageParkings.items);
    setStorageParking(apiData.data.listStorageParkings.items);
  }

  async function updateFormData() {
    // TODO Check for multiple options (Yes, yes, Y) then change result on line 119
    formData.handicap_accessible = Boolean(formData.handicap_accessible);
    formData.rent = Number(formData.rent);
    formData.phone = Number(formData.phone);
  }

  async function createStorageParking() {
    if ( !formData.type || !formData.handicap_accessible || !formData.rent || !formData.city || !formData.phone) return;
    updateFormData();
    await API.graphql({ query: createStorageParkingMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setStorageParking([ ...StorageParking, formData ]);
    setFormData(initialFormState);
    console.log(formData);
  }

  async function deleteStorageParking({ id }) {
    const newStorageParkingArray = StorageParking.filter(storageParking => storageParking.id !== id);
    console.log(newStorageParkingArray);
    setStorageParking(newStorageParkingArray);
    await API.graphql({ query: deleteStorageParkingMutation, variables: { input: { id } }});
  }

  return (
    <div className="StorageParking">
      <h1>Storage or Parking</h1>
      <input
        type="file"
        onChange={onChange}
      />
      <input
        onChange={e => setFormData({ ...formData, 'type': e.target.value})}
        placeholder="Type"
        value={formData.type}
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
      <button onClick={createStorageParking}>Add New Storage or Parking</button>
      <div style={{marginBottom: 30}}>
        {
          StorageParking.map(storageParking => (
            <div key={storageParking.id}>
              <h2>{storageParking.type}</h2>
              <p> Handicap Accessible: {storageParking.handicap_accessible.toString()}</p>
              <p> Rent per Month: {storageParking.rent}</p>
              <p> City: {storageParking.city}</p>
              <p> Contact Phone #: {storageParking.phone}</p>
              {
                storageParking.image && <img src={storageParking.image} style={{width: 400}} />
              }
              <p><button onClick={() => deleteStorageParking(storageParking)}>Delete Storage or Parking</button></p>
              <hr></hr>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default StorageParking;
