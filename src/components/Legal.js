import React, { useState, useEffect } from 'react';
import '../App.css';
import { API, Storage, Auth } from 'aws-amplify';
import { listLegals } from '../graphql/queries';
import { createLegal as createLegalMutation, deleteLegal as deleteLegalMutation } from '../graphql/mutations';
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

function Legal() {
  const [legals, setLegal] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [guest, guestOn] = useState(false);

  useEffect(() => {
    fetchLegal();
  }, []);

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchLegal();
  }

  async function fetchLegal() {
    const apiData = await API.graphql({ query: listLegals });
    console.log(apiData);
    const legalsFromAPI = apiData.data.listLegals.items;
    await Promise.all(legalsFromAPI.map(async legal => {
      if (legal.image) {
        const image = await Storage.get(legal.image);
        legal.image = image;
      }
      return legal;
    }))
    console.log(apiData.data.listLegals.items);
    setLegal(apiData.data.listLegals.items);
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

  async function createLegal() {
    checkGuest(Auth.currentUserInfo());
    if (guest) {
      toast.error('Sign in to create post', {position: toast.POSITION.TOP_CENTER});
    } 
    else {
      console.log(formData);
      if ( !formData.job_title || !formData.job_seeker || !formData.job_poster || !formData.compensation || !formData.job_type || !formData.city || !validatePhoneNumber(formData.phone)) return;
      updateFormData();
      console.log(formData);
      await API.graphql({ query: createLegalMutation, variables: { input: formData } });
      if (formData.image) {
        const image = await Storage.get(formData.image);
        formData.image = image;
      }
      setLegal([ ...legals, formData ]);
      setFormData(initialFormState);
      console.log(formData);
    }
  }

  async function deleteLegal({ id }) {
    checkGuest(Auth.currentUserInfo());
    if (guest) {
      toast.error('Sign in to delete post', {position: toast.POSITION.TOP_CENTER});
    } else {
      const newLegalArray = legals.filter(legal => legal.id !== id);
      console.log(newLegalArray);
      setLegal(newLegalArray);
      await API.graphql({ query: deleteLegalMutation, variables: { input: { id } }});
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
    <div className="Legal">
      <h1>Legal Jobs</h1>
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
      <button onClick={createLegal}>Add New Legal Job</button>
      <div style={{marginBottom: 30}}>
        {
          legals.map(legal => (
            <div key={legal.id}>
              <h2>{legal.job_title}</h2>
              {legal.job_seeker ? (<p> Seeking a Job </p>) : (<p> Seeking Employees </p>)}
              <p> Compensation: {legal.compensation}</p>
              <p> Type of Job: {legal.job_type}</p>
              <p> City: {legal.city}</p>
              <p> Contact Phone #: {legal.phone}</p>
              {
                legal.image && <img src={legal.image} style={{width: 400}} />
              }
              <p><button onClick={() => deleteLegal(legal)}>Delete Job</button></p>
              <hr></hr>
            </div>
          ))
        }
      </div>
      <ToastContainer />
    </div>
  );
}

export default Legal;
