import React, { useState, useEffect } from 'react';
import '../App.css';
import { API, Storage, Auth } from 'aws-amplify';
import { listVacationRentals } from '../graphql/queries';
import { createVacationRental as createVacationRentalMutation, deleteVacationRental as deleteVacationRentalMutation } from '../graphql/mutations';
import validator from 'validator';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialFormState = { 
    housing_type: '', 
    laundry: '',
    parking: '',
    handicap_accessible: '',
    animals: '',
    num_bedrooms: '',
    num_bathrooms: '',
    flooring: '',
    sqft: '',
    availability: '',
    rent_period: '',
    rent: '',
    city: '',
    phone: ''
}

function VacationRentals() {
  const [VacationRentals, setVacationRentals] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [guest, guestOn] = useState(false);

  useEffect(() => {
    fetchVacationRentals();
  }, []);

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchVacationRentals();
  }

  async function fetchVacationRentals() {
    const apiData = await API.graphql({ query: listVacationRentals });
    console.log(apiData);
    const VacationRentalsFromAPI = apiData.data.listVacationRentals.items;
    await Promise.all(VacationRentalsFromAPI.map(async vacationRentals => {
      if (vacationRentals.image) {
        const image = await Storage.get(vacationRentals.image);
        vacationRentals.image = image;
      }
      return vacationRentals;
    }))
    console.log(apiData.data.listVacationRentals.items);
    setVacationRentals(apiData.data.listVacationRentals.items);
  }

  async function updateFormData() {
    // TODO Check for multiple options (Yes, yes, Y) then change result on lines 179 - 182
    formData.laundry = Boolean(formData.laundry);
    formData.parking = Boolean(formData.parking);
    formData.handicap_accessible = Boolean(formData.handicap_accessible);
    formData.animals = Boolean(formData.animals);
    formData.num_bedrooms = Number(formData.num_bedrooms);
    formData.num_bathrooms = Number(formData.num_bathrooms);
    formData.sqft = Number(formData.sqft);
    formData.rent = Number(formData.rent);
    formData.phone = Number(formData.phone);
  }

  async function createVacationRental() {
    checkGuest(Auth.currentUserInfo());
    if (guest) {
      toast.error('Sign in to create post', {position: toast.POSITION.TOP_CENTER});
    } 
    else {
      if ( !formData.housing_type || !formData.laundry || !formData.parking || !formData.animals || !formData.handicap_accessible || !formData.num_bedrooms || !formData.num_bathrooms || !formData.flooring || !formData.sqft || !formData.availability || !formData.rent_period || !formData.rent || !formData.city || !validatePhoneNumber(formData.phone)) return;
      updateFormData();
      await API.graphql({ query: createVacationRentalMutation, variables: { input: formData } });
      if (formData.image) {
        const image = await Storage.get(formData.image);
        formData.image = image;
      }
      setVacationRentals([ ...VacationRentals, formData ]);
      setFormData(initialFormState);
      console.log(formData);
    }
  }

  async function deleteVacationRental({ id }) {
    checkGuest(Auth.currentUserInfo());
    if (guest) {
      toast.error('Sign in to delete post', {position: toast.POSITION.TOP_CENTER});
    } else {
      const newVacationRentalsArray = VacationRentals.filter(vacationRentals => vacationRentals.id !== id);
      console.log(newVacationRentalsArray);
      setVacationRentals(newVacationRentalsArray);
      await API.graphql({ query: deleteVacationRentalMutation, variables: { input: { id } }});
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
    <div className="VacationRentals">
      <h1>Vacation Rentals</h1>
      <input
        type="file"
        onChange={onChange}
      />
      <input
        onChange={e => setFormData({ ...formData, 'housing_type': e.target.value})}
        placeholder="Housing Type"
        value={formData.housing_type}
      />
      <input
        onChange={e => setFormData({ ...formData, 'laundry': e.target.value})}
        placeholder="Laundry"
        value={formData.laundry}
      />
      <input
        onChange={e => setFormData({ ...formData, 'parking': e.target.value})}
        placeholder="Parking"
        value={formData.parking}
      />
      <input
        onChange={e => setFormData({ ...formData, 'handicap_accessible': e.target.value})}
        placeholder="Handicap Accessible"
        value={formData.handicap_accessible}
      />
      <input
        onChange={e => setFormData({ ...formData, 'animals': e.target.value})}
        placeholder="Animals"
        value={formData.animals}
      />
      <input
        onChange={e => setFormData({ ...formData, 'num_bedrooms': e.target.value})}
        placeholder="# of Bedrooms"
        value={formData.num_bedrooms}
      />
      <input
        onChange={e => setFormData({ ...formData, 'num_bathrooms': e.target.value})}
        placeholder="# of Bathrooms"
        value={formData.num_bathrooms}
      />
      <input
        onChange={e => setFormData({ ...formData, 'flooring': e.target.value})}
        placeholder="Flooring"
        value={formData.flooring}
      />
      <input
        onChange={e => setFormData({ ...formData, 'sqft': e.target.value})}
        placeholder="Sqft"
        value={formData.sqft}
      />
      <input
        onChange={e => setFormData({ ...formData, 'availability': e.target.value})}
        placeholder="Availability"
        value={formData.availability}
      />
      <input
        onChange={e => setFormData({ ...formData, 'rent_period': e.target.value})}
        placeholder="Rent Period"
        value={formData.rent_period}
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
      <button onClick={createVacationRental}>Add New Vacation Rental</button>
      <div style={{marginBottom: 30}}>
        {
          VacationRentals.map(vacationRentals => (
            <div key={vacationRentals.id}>
              <h2>{vacationRentals.housing_type}</h2>
              <p> Laundry Included: {vacationRentals.laundry.toString()}</p>
              <p> Parking Included: {vacationRentals.parking}</p>
              <p> Handicap Accessible: {vacationRentals.handicap_accessible.toString()}</p>
              <p> Animals Allowed: {vacationRentals.animals.toString()}</p>
              <p> # of Bedrooms: {vacationRentals.num_bedrooms}</p>
              <p> # of Bathrooms: {vacationRentals.num_bathrooms}</p>
              <p> Flooring: {vacationRentals.flooring}</p>
              <p> Sqft: {vacationRentals.sqft}</p>
              <p> Availability: {vacationRentals.availability}</p>
              <p> Rent Period: {vacationRentals.rent_period}</p>
              <p> Rent per Month: {vacationRentals.rent}</p>
              <p> City: {vacationRentals.city}</p>
              <p> Contact Phone #: {vacationRentals.phone}</p>
              {
                vacationRentals.image && <img src={vacationRentals.image} style={{width: 400}} />
              }
              <p><button onClick={() => deleteVacationRental(vacationRentals)}>Delete Vacation Rental</button></p>
              <hr></hr>
            </div>
          ))
        }
      </div>
      <ToastContainer />
    </div>
  );
}

export default VacationRentals;
