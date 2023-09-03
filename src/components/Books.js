import React, { useState, useEffect } from 'react';
import '../App.css';
import { API, Storage, Auth } from 'aws-amplify';
import { listBookss } from '../graphql/queries';
import { createBooks as createBooksMutation, deleteBooks as deleteBooksMutation } from '../graphql/mutations';
import validator from 'validator';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialFormState = { 
  year_written: '',
  title: '', 
  author: '', 
  condition: '', 
  price: '',
  city: '',
  phone: ''
}

function Books() {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [guest, guestOn] = useState(false);


  useEffect(() => {
    fetchBooks();
  }, []);

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchBooks();
  }

  async function fetchBooks() {
    const apiData = await API.graphql({ query: listBookss });
    console.log(apiData);
    const booksFromAPI = apiData.data.listBookss.items;
    await Promise.all(booksFromAPI.map(async book => {
      if (book.image) {
        const image = await Storage.get(book.image);
        book.image = image;
      }
      return book;
    }))
    console.log(apiData.data.listBookss.items);
    setBooks(apiData.data.listBookss.items);
  }

  async function updateFormData() {
    formData.price = Number(formData.price);
    formData.phone = Number(formData.phone);
  }

  async function createBooks() {
    checkGuest(Auth.currentUserInfo());
    if (guest) {
      toast.error('Sign in to create post', {position: toast.POSITION.TOP_CENTER});
    } 
    else {
      if ( !formData.year_written || !formData.title || !formData.author || !formData.condition || !formData.price || !formData.city || !validatePhoneNumber(formData.phone) ) return;
      updateFormData();
      await API.graphql({ query: createBooksMutation, variables: { input: formData } });
      if (formData.image) {
        const image = await Storage.get(formData.image);
        formData.image = image;
      }
      setBooks([ ...books, formData ]);
      setFormData(initialFormState);
      console.log(formData);
    }
  }

  async function deleteBooks({ id }) {
    checkGuest(Auth.currentUserInfo());
    if (guest) {
      toast.error('Sign in to delete post', {position: toast.POSITION.TOP_CENTER});
    } else {
      const newBooksArray = books.filter(book => book.id !== id);
      console.log(newBooksArray);
      setBooks(newBooksArray);
      await API.graphql({ query: deleteBooksMutation, variables: { input: { id } }});
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
    <div className="Books">
      <h1>Books</h1>
      <input
        type="file"
        onChange={onChange}
      />
    <input
        onChange={e => setFormData({ ...formData, 'year_written': e.target.value})}
        placeholder="Year Written"
        value={formData.year_written}
      />
      <input
        onChange={e => setFormData({ ...formData, 'title': e.target.value})}
        placeholder="Title"
        value={formData.title}
      />
     <input
        onChange={e => setFormData({ ...formData, 'author': e.target.value})}
        placeholder="Author"
        value={formData.author}
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
      <button onClick={createBooks}>Add New Book</button>
      <div style={{marginBottom: 30}}>
        {
          books.map(book => (
            <div key={book.id}>
              <h2>{book.make_model}</h2>
              <p> Title: {book.title}</p>
              <p> Author: {book.author}</p>
              <p> Year Written: {book.year_written} </p>
              <p> Condition: {book.condition}</p>
              <p> Price: {book.price}</p>
              <p> City: {book.city}</p>
              <p> Contact Phone #: {book.phone}</p>
              {
                book.image && <img src={book.image} style={{width: 400}} />
              }
              <p><button onClick={() => deleteBooks(book)}>Delete Book</button></p>
              <hr></hr>
            </div>
          ))
        }
      </div>
      <ToastContainer />
    </div>
  );
}

export default Books;
