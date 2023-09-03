import React, { useState, useEffect } from 'react';
import './App.css';
import { 
  BrowserRouter as Router,
  Routes,
  Link,
  Route,
 } from "react-router-dom";
import Amplify, {API, Auth} from 'aws-amplify';
import CarsTrucks from './components/CarsTrucks';
import Home from './components/Home';
import SignIn from './components/SignIn';
import Register from './components/Register';
import VerifyRegistration from './components/VerifyRegistration';
import ForSale from './sections/ForSale';
import awsconfig from './aws-exports';
import Motorcycles from './components/Motorcycles';
import Activities from './components/Activities';
import AptHousing from './components/AptHousing';
import Automotive from './components/Automotive';
import Beauty from './components/Beauty';
import Boats from './components/Boats';
import Books from './components/Books';
import Childcare from './components/Childcare';
import Commercial from './components/Commercial';
import Computer from './components/Computer';
import CustomerService from './components/CustomerService';
import Finance from './components/Finance';
import Furniture from './components/Furniture';
import Household from './components/Household';
import LaborMoving from './components/LaborMoving';
import Legal from './components/Legal';
import LostFound from './components/LostFound';
import Musicians from './components/Musicians';
import RealEstate from './components/RealEstate';
import Software from './components/Software';
import StorageParking from './components/StorageParking';
import Sublets from './components/Sublets';
import VacationRentals from './components/VacationRentals';
import Volunteers from './components/Volunteers';
import Housing from './sections/Housing';
import Services from './sections/Services';
import Jobs from './sections/Jobs';
import Community from './sections/Community';
import AboutUs from './components/AboutUs';

Amplify.configure(awsconfig);
Auth.configure(awsconfig);

function App() {

  const [loggedIn, setLoggedIn] = useState(true);
  const [user, setUsername] = useState('');
  const [guestUser, guestUserOn] = useState(true);

  useEffect(() => {
    checkIfLoggedIn();
  }, []); 

  const getUser = () => {
    Auth.currentUserInfo().then((userInfo) => {
      var authUser = userInfo;
      console.log(authUser.username);
      setUsername(authUser.username);
    })
  }

  const checkIfLoggedIn = () => {
    if(user === "guest") {
      console.log("guest user is signed in");
    }
    Auth.currentAuthenticatedUser().then(() => {
      console.log('logged in');
      setLoggedIn(true);
      getUser();
      console.log(user);
    })
    .catch(() => {
      console.log('not logged in');
      signInAsGuest();
      setLoggedIn(false);
    });
  };

  const signInAsGuest = async () => {
    const user = await Auth.signIn('reowens@iastate.edu', 'test1234');
      console.log(user);
      //navigate('/home');
      setLoggedIn(false);
      guestUserOn(true);
      setUsername("guest");
  };
  const signOut = async () => {
    //try {
      //await Auth.signOut();
    try {
      Auth.signOut();
      signInAsGuest();
    } catch (error) {
        console.log('error signing out: ', error);
    }
  };



  const onSignIn = () => {
    setLoggedIn(true);
  }

  return (
    <Router>
    <div className="App">
        <header className="App-header">
          <h2>SE 422X Craigslist App</h2>
          <button><Link to="/home">Home</Link></button>
          <button><Link to="/aboutus">About Us</Link></button>
          <button><Link to="/forsale">For Sale</Link></button>
          <button><Link to="/housing">Housing</Link></button>
          <button><Link to="/community">Community</Link></button>
          <button><Link to="/jobs">Jobs</Link></button>
          <button><Link to="/services">Services</Link></button>
            {loggedIn ? (
                <button onClick={signOut} >
                    Log Out
                </button>
            ) : (
                <Link to="/signin">
                    <button > 
                        Log In
                    </button>
                </Link>
            )}
        </header>
        <Routes>
          <Route exact path='/' element= {
            <Home />}>
          </Route>
          <Route path='/signin' element={
            <SignIn onSignIn={onSignIn}></SignIn> }>
          </Route>
          <Route path="home" element={<Home />} />
          <Route path="carstrucks" element={<CarsTrucks />} />
          <Route path="forsale" element={<ForSale />} />   
          <Route path="register" element={<Register />} />   
          <Route path="verifyregistration" element={<VerifyRegistration />} />   
          <Route path="activities" element={<Activities />} />
          <Route path="apthousing" element={<AptHousing />} />    
          <Route path="automotive" element={<Automotive />} />
          <Route path="beauty" element={<Beauty />} />
          <Route path="boats" element={<Boats />} />
          <Route path="books" element={<Books />} />
          <Route path="childcare" element={<Childcare />} />
          <Route path="commercial" element={<Commercial />} />   
          <Route path="computer" element={<Computer />} />
          <Route path="customerservice" element={<CustomerService />} />
          <Route path="finance" element={<Finance />} />
          <Route path="furniture" element={<Furniture />} />
          <Route path="household" element={<Household />} />
          <Route path="labormoving" element={<LaborMoving />} />   
          <Route path="legal" element={<Legal />} />
          <Route path="lostfound" element={<LostFound />} />
          <Route path="motorcycles" element={<Motorcycles />} />
          <Route path="musicians" element={<Musicians />} />
          <Route path="realestate" element={<RealEstate />} />
          <Route path="software" element={<Software />} />   
          <Route path="storageparking" element={<StorageParking />} />
          <Route path="sublets" element={<Sublets />} />
          <Route path="vacationrentals" element={<VacationRentals />} />
          <Route path="volunteers" element={<Volunteers />} />
          <Route path="housing" element={<Housing />} />   
          <Route path="services" element={<Services />} />   
          <Route path="jobs" element={<Jobs />} />   
          <Route path="community" element={<Community />} /> 
          <Route path="aboutus" element={<AboutUs />} /> 
        </Routes>
    </div>
    <div
        style={{
          color: "white",
          position: "fixed",
          left: 0,
          bottom: 0,
          right: 0,
          backgroundColor: "#282c34"
        }}
      >
        Iowa State University Spring 2022 SE 422X Project Group Join Me
      </div>
    </Router>
  );
}

export default App;
