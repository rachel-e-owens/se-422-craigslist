import React, { useState, useEffect } from 'react';
import '../App.css';
import { API, Storage } from 'aws-amplify';
import { listSoftwares } from '../graphql/queries';
import { createSoftware as createSoftwareMutation, deleteSoftware as deleteSoftwareMutation } from '../graphql/mutations';

const initialFormState = { 
  job_title: '',
  job_seeker: '',
  job_poster: '',
  compensation: '',
  job_type: '', 
  city: '',
  phone: ''
}

function Software() {
  const [softwares, setSoftware] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchSoftware();
  }, []);

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchSoftware();
  }

  async function fetchSoftware() {
    const apiData = await API.graphql({ query: listSoftwares });
    console.log(apiData);
    const softwaresFromAPI = apiData.data.listSoftwares.items;
    await Promise.all(softwaresFromAPI.map(async software => {
      if (software.image) {
        const image = await Storage.get(software.image);
        software.image = image;
      }
      return software;
    }))
    console.log(apiData.data.listSoftwares.items);
    setSoftware(apiData.data.listSoftwares.items);
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

  async function createSoftware() {
    console.log(formData);
    if ( !formData.job_title || !formData.job_seeker || !formData.job_poster || !formData.compensation || !formData.job_type || !formData.city || !formData.phone) return;
    updateFormData();
    console.log(formData);
    await API.graphql({ query: createSoftwareMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setSoftware([ ...softwares, formData ]);
    setFormData(initialFormState);
    console.log(formData);
  }

  async function deleteSoftware({ id }) {
    const newSoftwareArray = softwares.filter(software => software.id !== id);
    console.log(newSoftwareArray);
    setSoftware(newSoftwareArray);
    await API.graphql({ query: deleteSoftwareMutation, variables: { input: { id } }});
  }

  return (
    <div className="Software">
      <h1>Software Jobs</h1>
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
      <button onClick={createSoftware}>Add New Software Job</button>
      <div style={{marginBottom: 30}}>
        {
          softwares.map(software => (
            <div key={software.id}>
              <h2>{software.job_title}</h2>
              {software.job_seeker ? (<p> Seeking a Job </p>) : (<p> Seeking Employees </p>)}
              <p> Compensation: {software.compensation}</p>
              <p> Type of Job: {software.job_type}</p>
              <p> City: {software.city}</p>
              <p> Contact Phone #: {software.phone}</p>
              {
                software.image && <img src={software.image} style={{width: 400}} />
              }
              <p><button onClick={() => deleteSoftware(software)}>Delete Job</button></p>
              <hr></hr>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Software;
