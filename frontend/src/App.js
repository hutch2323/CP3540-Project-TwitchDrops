import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Current, Past, FAQS } from "./pages";

function App() {

  const [twitchDrops, setTwitchDrops] = useState([]);
  const [pastDrops, setPastDrops] = useState([]);
  const [faqs, setFAQS] = useState([]);

  useEffect(() => {
    fetch('/api/activeTwitchDrops', {
      method: "GET",
      withCredentials: true,
      headers: {
        "apiKey": "ef72570ff371408f9668e414353b7b2e",
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then(setTwitchDrops)
  }, []);

  useEffect(() => {
    fetch('/api/inactiveTwitchDrops', {
      method: "GET",
      withCredentials: true,
      headers: {
        "apiKey": "ef72570ff371408f9668e414353b7b2e",
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then(setPastDrops)
  }, []);

  useEffect(() => {
    fetch('/api/faqs', {
      method: "GET",
      withCredentials: true,
      headers: {
        "apiKey": "ef72570ff371408f9668e414353b7b2e",
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then(setFAQS)
  }, []);

  // if( twitchDrops == null) return null;

  return (

    <div className="App">
      <>
        <Routes>
          <Route path="/" element={<Current twitchDrops={twitchDrops}/>}/>
          <Route path="/pastdrops" element={<Past pastDrops={pastDrops}/>}/>
          <Route path="/faq" element={<FAQS faqs={faqs}/>}/>
        </Routes>
      </>
    </div>
      );
    }

export default App;
