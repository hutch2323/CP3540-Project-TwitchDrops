import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { BsClock } from "react-icons/bs"; 
import {Home, Faqs, PageNotFound } from "./pages"
import { Routes, Route } from "react-router-dom"

function App() {

  const [twitchDrops, setTwitchDrops] = useState([]);

  useEffect(() => {
    fetch('/api/twitchDrops')
      .then((response) => response.json())
      .then(setTwitchDrops)
  }, []);

  if( twitchDrops == null) return null;

  return (

    <div>
      <Routes>
        <Route path="/" element={<Home twitchDrops={twitchDrops} setTwitchDrops={setTwitchDrops} />}/>
        <Route path="/faqs" element={<Faqs twitchDrops={twitchDrops} setTwitchDrops={setTwitchDrops} />}/>
        <Route path="*" element={<PageNotFound />}/>
      </Routes>
    </div>
    
  );
}


export default App;
