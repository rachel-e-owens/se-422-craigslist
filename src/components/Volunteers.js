import React, { useState, useEffect } from 'react';
import '../App.css';
import { API, Storage, Auth } from 'aws-amplify';
import { listVolunteerss } from '../graphql/queries';
import { createVolunteers as createVolunteersMutation, deleteVolunteers as deleteVolunteersMutation } from '../graphql/mutations';
import validator from 'validator';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialFormState = { 
  event_type: '', 
  date: '', 
  hours: '', 
  posting_title: '', 
  city: '',
  phone: ''
}

function Volunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [guest, guestOn] = useState(false);

  useEffect(() => {
    fetchVolunteers();
  }, []);

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchVolunteers();
  }

  async function fetchVolunteers() {
    const apiData = await API.graphql({ query: listVolunteerss });
    console.log(apiData);
    const volunteersFromAPI = apiData.data.listVolunteerss.items;
    await Promise.all(volunteersFromAPI.map(async volunteer => {
      if (volunteer.image) {
        const image = await Storage.get(volunteer.image);
        volunteer.image = image;
      }
      return volunteer;
    }))
    console.log(apiData.data.listVolunteerss.items);
    setVolunteers(apiData.data.listVolunteerss.items);
  }

  async function updateFormData() {
    formData.phone = Number(formData.phone);
  }

  async function createVolunteers() {
    checkGuest(Auth.currentUserInfo());
    if (guest) {
      toast.error('Sign in to create post', {position: toast.POSITION.TOP_CENTER});
    } 
    else {
      if (!formData.event_type ||  !formData.date || !formData.hours || !formData.posting_title || !formData.city || !validatePhoneNumber(formData.phone)) return;
      updateFormData();
      await API.graphql({ query: createVolunteersMutation, variables: { input: formData } });
      if (formData.image) {
        const image = await Storage.get(formData.image);
        formData.image = image;
      }
      setVolunteers([ ...volunteers, formData ]);
      setFormData(initialFormState);
      console.log(formData);
    }
  }

  async function deleteVolunteers({ id }) {
    checkGuest(Auth.currentUserInfo());
    if (guest) {
      toast.error('Sign in to delete post', {position: toast.POSITION.TOP_CENTER});
    } else {
      const newVolunteersArray = volunteers.filter(volunteer => volunteer.id !== id);
      console.log(newVolunteersArray);
      setVolunteers(newVolunteersArray);
      await API.graphql({ query: deleteVolunteersMutation, variables: { input: { id } }});
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
    <div className="Volunteers">
      <h1>Volunteering</h1>
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
        onChange={e => setFormData({ ...formData, 'event_type': e.target.value})}
        placeholder="Event Type"
        value={formData.event_type}
      />
      <input
        onChange={e => setFormData({ ...formData, 'date': e.target.value})}
        placeholder="Date"
        value={formData.date}
      />
     <input
        onChange={e => setFormData({ ...formData, 'hours': e.target.value})}
        placeholder="Hours"
        value={formData.hours}
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
      <button onClick={createVolunteers}>Add New Volunteer</button>
      <div style={{marginBottom: 30}}>
        {
          volunteers.map(volunteer => (
            <div key={volunteer.id}>
              <h2>{volunteer.posting_title}</h2>
              <p>type: {volunteer.event_type}</p>
              <p>date: {volunteer.date}</p>
              <p>city: {volunteer.city}</p>
              <p>hours: {volunteer.hours}</p>
              <p>phone: {volunteer.phone}</p>
              {
                volunteer.image && <img src={volunteer.image} style={{width: 400}} />
              }
              <p><button onClick={() => deleteVolunteers(volunteer)}>Delete Volunteering opportunity</button></p>
            </div>
          ))
        }
      </div>
      <ToastContainer />
    </div>
  );
}

export default Volunteers;
