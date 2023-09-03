import React, { useState, useEffect, version } from 'react';
import '../App.css';
import { API, Storage, Auth } from 'aws-amplify';
import { listCommercials } from '../graphql/queries';
import { createCommercial as createCommercialMutation, deleteCommercial as deleteCommercialMutation } from '../graphql/mutations';
import validator from 'validator';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [guest, guestOn] = useState(false);

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
    checkGuest(Auth.currentUserInfo());
    if (guest) {
      toast.error('Sign in to create post', {position: toast.POSITION.TOP_CENTER});
    } 
    else {
      if (!formData.sqft || !formData.handicap_accessible || !formData.rent || !formData.city || !validatePhoneNumber(formData.phone)) return;
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
  }

  async function deleteCommercial({ id }) {
    checkGuest(Auth.currentUserInfo());
    if (guest) {
      toast.error('Sign in to delete post', {position: toast.POSITION.TOP_CENTER});
    } else {
      const newCommercialArray = Commercial.filter(commercial => commercial.id !== id);
      console.log(newCommercialArray);
      setCommercial(newCommercialArray);
      await API.graphql({ query: deleteCommercialMutation, variables: { input: { id } }});
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
      <ToastContainer />
    </div>
  );
}

export default Commercial;
