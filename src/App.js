import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Items from './components/Items/Items';
import About from './components/About/About';
import Authentication from './components/Authentication/Authentication';
import Product from './components/Product/Product';
import { useDispatch,useSelector } from 'react-redux';
import SetCurrentUser from './state/actionCreaters/UserAuthData';


import { initializeApp } from "firebase/app";
import { firebaseConfig } from './firebase-service';
import { getAuth } from 'firebase/auth';
import UserComponent from './components/User/UserComponent';
const app = initializeApp(firebaseConfig);

function App() {
  const dispatch=useDispatch()
  
    getAuth().onAuthStateChanged((u)=>{
      if(u){
        dispatch(SetCurrentUser(u))
      }
    })
    
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/items' element={<Items />}>
          </Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/auth' element={<Authentication/>}></Route>
          <Route path='/item/:id/:name' element={<Product/>}></Route>
          <Route path='/user/:name' element = {<UserComponent />} />
          <Route path='/' element={<Home />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
