import React, { useState, useEffect } from 'react';
import '../App.css';
import { API, Storage, Auth } from 'aws-amplify';
import { listFinances } from '../graphql/queries';
import { createFinance as createFinanceMutation, deleteFinance as deleteFinanceMutation } from '../graphql/mutations';
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

function Finance() {
  const [finances, setFinance] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [guest, guestOn] = useState(false);

  useEffect(() => {
    fetchFinance();
  }, []);

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchFinance();
  }

  async function fetchFinance() {
    const apiData = await API.graphql({ query: listFinances });
    console.log(apiData);
    const financesFromAPI = apiData.data.listFinances.items;
    await Promise.all(financesFromAPI.map(async finance => {
      if (finance.image) {
        const image = await Storage.get(finance.image);
        finance.image = image;
      }
      return finance;
    }))
    console.log(apiData.data.listFinances.items);
    setFinance(apiData.data.listFinances.items);
  }

  async function updateFormData() {
    formData.job_seeker = Boolean(formData.job_seeker);
    formData.job_poster = Boolean(formData.job_poster);
    formData.compensation = Number(formData.compensation);
    formData.phone = Number(formData.phone);
  }

  async function createFinance() {
    checkGuest(Auth.currentUserInfo());
    if (guest) {
      toast.error('Sign in to create post', {position: toast.POSITION.TOP_CENTER});
    } 
    else {
      console.log(formData);
      if ( !formData.job_title || !formData.job_seeker || !formData.job_poster || !formData.compensation || !formData.job_type || !formData.city || !validatePhoneNumber(formData.phone)) return;
      updateFormData();
      console.log(formData);
      await API.graphql({ query: createFinanceMutation, variables: { input: formData } });
      if (formData.image) {
        const image = await Storage.get(formData.image);
        formData.image = image;
      }
      setFinance([ ...finances, formData ]);
      setFormData(initialFormState);
      console.log(formData);
    }
  }

  async function deleteFinance({ id }) {
    checkGuest(Auth.currentUserInfo());
    if (guest) {
      toast.error('Sign in to delete post', {position: toast.POSITION.TOP_CENTER});
    } else {
      const newFinanceArray = finances.filter(finance => finance.id !== id);
      console.log(newFinanceArray);
      setFinance(newFinanceArray);
      await API.graphql({ query: deleteFinanceMutation, variables: { input: { id } }});
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
    <div className="Finance">
      <h1>Finance Jobs</h1>
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
      <button onClick={createFinance}>Add New Finance Job</button>
      <div style={{marginBottom: 30}}>
        {
          finances.map(finance => (
            <div key={finance.id}>
              <h2>{finance.job_title}</h2>
              {finance.job_seeker ? (<p> Seeking a Job </p>) : (<p> Seeking Employees </p>)}
              <p> Compensation: {finance.compensation}</p>
              <p> Type of Job: {finance.job_type}</p>
              <p> City: {finance.city}</p>
              <p> Contact Phone #: {finance.phone}</p>
              {
                finance.image && <img src={finance.image} style={{width: 400}} />
              }
              <p><button onClick={() => deleteFinance(finance)}>Delete Job</button></p>
              <hr></hr>
            </div>
          ))
        }
      </div>
      <ToastContainer />
    </div>
  );
}

export default Finance;
