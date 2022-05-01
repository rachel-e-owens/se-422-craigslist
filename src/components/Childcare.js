import React, { useState, useEffect, version } from 'react';
import '../App.css';
import { API, Storage } from 'aws-amplify';
import { getChildcare, listChildcares } from '../graphql/queries';
import { createChildcare as createChildcareMutation, deleteChildcare as deleteChildcareMutation } from '../graphql/mutations';
import { useNavigate } from "react-router-dom";

const initialFormState = { 
  posting_title: '', 
  private: '', 
  group: '', 
  available_hours: '', 
  age_range: '',
  pay_rate: '',
  city: '',
  phone: ''
}

function Childcare() {
  const [childcares, setChildcare] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchChildcare();
  }, []);

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchChildcare();
  }

  async function fetchChildcare() {
    const apiData = await API.graphql({ query: listChildcares });
    console.log(apiData);
    const childcaresFromAPI = apiData.data.listChildcares.items;
    await Promise.all(childcaresFromAPI.map(async Childcare => {
      if (Childcare.image) {
        const image = await Storage.get(Childcare.image);
        Childcare.image = image;
      }
      return Childcare;
    }))
    console.log(apiData.data.listChildcares.items);
    setChildcare(apiData.data.listChildcares.items);
  }

  async function updateFormData() {
    if (formData.private === "yes" || formData.private === "Yes" || formData.private === "Y") {
      formData.private = true;
    }
    else {
        formData.private = false;
    }
    if (formData.group === "yes" || formData.group === "Yes" || formData.group === "Y") {
      formData.group = true;
    }
    else {
        formData.group = false;
    }
    formData.pay_rate = Number(formData.pay_rate);
    formData.phone = Number(formData.phone);
  }

  async function createChildcare() {
    if (!formData.posting_title || !formData.private || !formData.group || !formData.available_hours || !formData.age_range || !formData.pay_rate || !formData.city || !formData.phone) return;
    updateFormData();
    await API.graphql({ query: createChildcareMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setChildcare([ ...childcares, formData ]);
    setFormData(initialFormState);
    console.log(formData);
  }

  async function deleteChildcare({ id }) {
    const newChildcareArray = childcares.filter(childcare => childcare.id !== id);
    console.log(newChildcareArray);
    setChildcare(newChildcareArray);
    await API.graphql({ query: deleteChildcareMutation, variables: { input: { id } }});
  }

  return (
    <div className="Childcare">
      <h1>Childcare</h1>
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
      type = "number"
        onChange={e => setFormData({ ...formData, 'private': e.target.value})}
        placeholder="Private (0 for false 1 for true)"
        value={formData.private}
      />
     <input
        onChange={e => setFormData({ ...formData, 'group': e.target.value})}
        placeholder="Group"
        value={formData.group}
      />
    <input
        onChange={e => setFormData({ ...formData, 'available_hours': e.target.value})}
        placeholder="Available Hours"
        value={formData.available_hours}
      />
    <input
    type = "number"
        onChange={e => setFormData({ ...formData, 'age_range': e.target.value})}
        placeholder="Age Range"
        value={formData.age_range}
      />
      <input
      type = "number"
        onChange={e => setFormData({ ...formData, 'pay_rate': e.target.value})}
        placeholder="Pay Rate"
        value={formData.pay_rate}
      />
      <input
        onChange={e => setFormData({ ...formData, 'city': e.target.value})}
        placeholder="City"
        value={formData.city}
      />
      <input
      type = "number"
        onChange={e => setFormData({ ...formData, 'phone': e.target.value})}
        placeholder="Phone"
        value={formData.phone}
      />
      <button onClick={createChildcare}>Add New Childcare</button>
      <div style={{marginBottom: 30}}>
        {
          childcares.map(childcare => (
            <div key={childcare.id}>
              <h2>{childcare.posting_title}</h2>
              <p>Pay rate: {childcare.pay_rate}</p>
              <p>Age range: {childcare.age_range}</p>
              {childcare.private ? (<p> Private Childcare </p>) : (<p> Group Childcare </p>)}
              <p>City: {childcare.city}</p>
              <p>Phone: {childcare.phone}</p>
              {
                childcare.image && <img src={childcare.image} style={{width: 400}} />
              }
              <p> <button onClick={() => deleteChildcare(childcare)}>Delete Childcare</button></p>
              <hr></hr>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Childcare;
