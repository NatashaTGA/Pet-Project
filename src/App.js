import React from 'react';
import './App.css';
import {
  Route, Routes
} from "react-router-dom";
import Header from "./components/Header/index"
import Home from "./Pages/Home/index"
import Coin from "./Pages/Coin/index"
import Dashboard from './components/Dashboard';
import GoogleButton from './components/GoogleButton';

function App() {
  
  return (
      <main>
        <GoogleButton />
        <Header/>
        <Routes>
          <Route path='/' element={<Home />} exact/>
          <Route path='/coins/:id' element={<Coin />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
        </Routes>
      </main>
  );
}

export default App;
