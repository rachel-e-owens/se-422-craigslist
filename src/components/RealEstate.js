import React, { useState, useEffect } from 'react';
import '../App.css';
import { API, Storage, Auth } from 'aws-amplify';
import { listRealEstates } from '../graphql/queries';
import { createRealEstate as createRealEstateMutation, deleteRealEstate as deleteRealEstateMutation } from '../graphql/mutations';
import validator from 'validator';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialFormState = { 
  job_title: '',
  job_seeker: '',
  job_poster: '',
  compensation: '',
  job_type: '', 
  city: '',
  phone: ''
}

function RealEstate() {
  const [realestates, setRealEstate] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [guest, guestOn] = useState(false);

  useEffect(() => {
    fetchRealEstate();
  }, []);

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchRealEstate();
  }

  async function fetchRealEstate() {
    const apiData = await API.graphql({ query: listRealEstates });
    console.log(apiData);
    const realestatesFromAPI = apiData.data.listRealEstates.items;
    await Promise.all(realestatesFromAPI.map(async realestate => {
      if (realestate.image) {
        const image = await Storage.get(realestate.image);
        realestate.image = image;
      }
      return realestate;
    }))
    console.log(apiData.data.listRealEstates.items);
    setRealEstate(apiData.data.listRealEstates.items);
  }

  async function updateFormData() {
    if (formData.job_seeker === "yes" || formData.job_seeker === "Yes" || formData.job_seeker === "Y") {
        formData.job_seeker = true;
    }
    else {
        formData.job_seeker = false;
    }
    if (formData.job_poster === "yes" || formData.job_poster === "Yes" || formData.job_poster === "Y") {
        formData.job_poster = true;
    }
    else {
        formData.job_poster = false;
    }
    formData.compensation = Number(formData.compensation);
    formData.phone = Number(formData.phone);
  }

  async function createRealEstate() {
    checkGuest(Auth.currentUserInfo());
    if (guest) {
      toast.error('Sign in to create post', {position: toast.POSITION.TOP_CENTER});
    } 
    else {
      console.log(formData);
      if ( !formData.job_title || !formData.job_seeker || !formData.job_poster || !formData.compensation || !formData.job_type || !formData.city || !validatePhoneNumber(formData.phone)) return;
      updateFormData();
      console.log(formData);
      await API.graphql({ query: createRealEstateMutation, variables: { input: formData } });
      if (formData.image) {
        const image = await Storage.get(formData.image);
        formData.image = image;
      }
      setRealEstate([ ...realestates, formData ]);
      setFormData(initialFormState);
      console.log(formData);
    }
  }

  async function deleteRealEstate({ id }) {
    checkGuest(Auth.currentUserInfo());
    if (guest) {
      toast.error('Sign in to delete post', {position: toast.POSITION.TOP_CENTER});
    } else {
      const newRealEstateArray = realestates.filter(realestate => realestate.id !== id);
      console.log(newRealEstateArray);
      setRealEstate(newRealEstateArray);
      await API.graphql({ query: deleteRealEstateMutation, variables: { input: { id } }});
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
    <div className="RealEstate">
      <h1>Real Estate Jobs</h1>
      <input
        type="file"
        onChange={onChange}
      />
    <input
        onChange={e => setFormData({ ...formData, 'job_title': e.target.value})}
        placeholder="Job Title"
        value={formData.job_title}
      />
      <input
        onChange={e => setFormData({ ...formData, 'job_seeker': e.target.value})}
        placeholder="Seeking a Job?"
        value={formData.job_seeker}
      />
     <input
        onChange={e => setFormData({ ...formData, 'job_poster': e.target.value})}
        placeholder="Posting a Job?"
        value={formData.job_poster }
      />
    <input
        onChange={e => setFormData({ ...formData, 'compensation': e.target.value})}
        placeholder="Compensation"
        value={formData.compensation }
      />
    <input
        onChange={e => setFormData({ ...formData, 'job_type': e.target.value})}
        placeholder="Type of Job?"
        value={formData.job_type }
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
      <button onClick={createRealEstate}>Add New Real Estate Job</button>
      <div style={{marginBottom: 30}}>
        {
          realestates.map(realestate => (
            <div key={realestate.id}>
              <h2>{realestate.job_title}</h2>
              {realestate.job_seeker ? (<p> Seeking a Job </p>) : (<p> Seeking Employees </p>)}
              <p> Compensation: {realestate.compensation}</p>
              <p> Type of Job: {realestate.job_type}</p>
              <p> City: {realestate.city}</p>
              <p> Contact Phone #: {realestate.phone}</p>
              {
                realestate.image && <img src={realestate.image} style={{width: 400}} />
              }
              <p><button onClick={() => deleteRealEstate(realestate)}>Delete Job</button></p>
              <hr></hr>
            </div>
          ))
        }
      </div>
      <ToastContainer />
    </div>
  );
}

export default RealEstate;
