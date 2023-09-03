import React, { useState, useEffect } from 'react';
import '../App.css';
import { API, Storage, Auth } from 'aws-amplify';
import { listMotorcycless } from '../graphql/queries';
import { createMotorcycles as createMotorcyclesMutation, deleteMotorcycles as deleteMotorcyclesMutation } from '../graphql/mutations';
import validator from 'validator';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialFormState = { 
  build_year: '',
  make_model: '', 
  color: '', 
  type: '', 
  condition: '',
  price: '',
  city: '',
  phone: ''
}

function Motorcycles() {
  const [motorcycles, setMotorcycles] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [guest, guestOn] = useState(false);

  useEffect(() => {
    fetchMotorcycles();
  }, []);

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchMotorcycles();
  }

  async function fetchMotorcycles() {
    const apiData = await API.graphql({ query: listMotorcycless });
    console.log(apiData);
    const motorcyclesFromAPI = apiData.data.listMotorcycless.items;
    await Promise.all(motorcyclesFromAPI.map(async motorcycle => {
      if (motorcycle.image) {
        const image = await Storage.get(motorcycle.image);
        motorcycle.image = image;
      }
      return motorcycle;
    }))
    console.log(apiData.data.listMotorcycless.items);
    setMotorcycles(apiData.data.listMotorcycless.items);
  }

  async function updateFormData() {
    formData.build_year = Number(formData.build_year);
    formData.price = Number(formData.price);
    formData.phone = Number(formData.phone);
  }

  async function createMotorcycles() {
    checkGuest(Auth.currentUserInfo());
    if (guest) {
      toast.error('Sign in to create post', {position: toast.POSITION.TOP_CENTER});
    } 
    else {
      if ( !formData.build_year || !formData.make_model || !formData.color || !formData.type || !formData.condition || !formData.price || !formData.city || !validatePhoneNumber(formData.phone)) return;
      updateFormData();
      await API.graphql({ query: createMotorcyclesMutation, variables: { input: formData } });
      if (formData.image) {
        const image = await Storage.get(formData.image);
        formData.image = image;
      }
      setMotorcycles([ ...motorcycles, formData ]);
      setFormData(initialFormState);
      console.log(formData);
    }
  }

  async function deleteMotorcycles({ id }) {
    checkGuest(Auth.currentUserInfo());
    if (guest) {
      toast.error('Sign in to delete post', {position: toast.POSITION.TOP_CENTER});
    } else {
      const newMotorcyclesArray = motorcycles.filter(motorcycle => motorcycle.id !== id);
      console.log(newMotorcyclesArray);
      setMotorcycles(newMotorcyclesArray);
      await API.graphql({ query: deleteMotorcyclesMutation, variables: { input: { id } }});
    }
  }

  const validatePhoneNumber = (number) => {
    console.log("current phone number is " + formData.phone);
    const isValidPhoneNumber = validator.isMobilePhone(number);
    if (!isValidPhoneNumber) {
      toast.error('Please enter a valid phone number', {position: toast.POSITION.TOP_CENTER});
    }
    return isValidPhoneNumber;
  };

  const checkGuest = (user) => {
    Auth.currentAuthenticatedUser().then((user) => {
      console.log('user email = ' + user.attributes.email);
      if (user.attributes.email === 'reowens@iastate.edu') {
        guestOn(true);
      }
      else {
        guestOn(false);
      }
    });
  }

  return (
    <div className="Motorcycles">
      <h1>Motorcycles</h1>
      <input
        type="file"
        onChange={onChange}
      />
    <input
        onChange={e => setFormData({ ...formData, 'build_year': e.target.value})}
        placeholder="Build Year"
        value={formData.build_year}
      />
      <input
        onChange={e => setFormData({ ...formData, 'make_model': e.target.value})}
        placeholder="Make Model"
        value={formData.make_model}
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
      <button onClick={createMotorcycles}>Add New Motorcycle</button>
      <div style={{marginBottom: 30}}>
        {
          motorcycles.map(motorcycle => (
            <div key={motorcycle.id}>
              <h2>{motorcycle.make_model}</h2>
              <p> Year: {motorcycle.build_year} </p>
              <p> Color: {motorcycle.color}</p>
              <p> Type: {motorcycle.type}</p>
              <p> Condition: {motorcycle.condition}</p>
              <p> Price: {motorcycle.price}</p>
              <p> City: {motorcycle.city}</p>
              <p> Contact Phone #: {motorcycle.phone}</p>
              {
                motorcycle.image && <img src={motorcycle.image} style={{width: 400}} />
              }
              <p><button onClick={() => deleteMotorcycles(motorcycle)}>Delete Motorcycle</button></p>
              <hr></hr>
            </div>
          ))
        }
      </div>
      <ToastContainer />
    </div>
  );
}

export default Motorcycles;
