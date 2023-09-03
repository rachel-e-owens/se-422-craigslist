import React, { useState, useEffect } from 'react';
import '../App.css';
import { API, Storage, Auth } from 'aws-amplify';
import { listNotes } from '../graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from '../graphql/mutations';
import validator from 'validator';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const initialFormState = { name: '', description: '' }

function Test() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [guest, guestOn] = useState(false);


  useEffect(() => {
    fetchNotes();
  }, []);

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchNotes();
  }

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    console.log(apiData);
    const notesFromAPI = apiData.data.listNotes.items;
    await Promise.all(notesFromAPI.map(async note => {
      if (note.image) {
        const image = await Storage.get(note.image);
        note.image = image;
      }
      return note;
    }))
    setNotes(apiData.data.listNotes.items);
  }

  async function createNote() {
    checkGuest(Auth.currentUserInfo());
    if (guest) {
      toast.error('Sign in to create post', {position: toast.POSITION.TOP_CENTER});
    } 
    else {
      if (!formData.name || !formData.description) return;
      await API.graphql({ query: createNoteMutation, variables: { input: formData } });
      if (formData.image) {
        const image = await Storage.get(formData.image);
        formData.image = image;
      }
      setNotes([ ...notes, formData ]);
      setFormData(initialFormState);
      console.log(formData);
    }
  }

  async function deleteNote({ id }) {
    checkGuest(Auth.currentUserInfo());
    if (guest) {
      toast.error('Sign in to delete post', {position: toast.POSITION.TOP_CENTER});
    } 
    else {
      const newNotesArray = notes.filter(note => note.id !== id);
      console.log(newNotesArray);
      setNotes(newNotesArray);
      await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }});
    }
  }


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
    <div className="Test">
      <h1>Create Activity</h1>
      <input
        type="file"
        onChange={onChange}
      />
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Activity Name"
        value={formData.name}
      />
      <input
        onChange={e => setFormData({ ...formData, 'description': e.target.value})}
        placeholder="Activity Description"
        value={formData.description}
      />
      <button onClick={createNote}>Create Activity</button>
      <div style={{marginBottom: 30}}>
        {
          notes.map(note => (
            <div key={note.id || note.name}>
              <h2>{note.name}</h2>
              <p>Description: {note.description}</p>
              {
                note.image && <img src={note.image} style={{width: 400}} />
              }
              <p> <button onClick={() => deleteNote(note)}>Delete Activity</button></p>
              <hr></hr>
            </div>
          ))
        }
      </div>
        <ToastContainer />
    </div>
  );
}

export default Test;
