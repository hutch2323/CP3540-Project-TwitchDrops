import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, Image } from 'react-bootstrap';
import { BsClock } from "react-icons/bs"; 
import { Current, Past, FAQ } from "./pages";

function App() {

  const [twitchDrops, setTwitchDrops] = useState([]);

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

  if( twitchDrops == null) return null;

  return (

    <div className="App">
      <Container>
        <Routes>
          <Route path="/" element={<Current twitchDrops={twitchDrops}/>}/>
          <Route path="/pastdrops" element={<Past />}/>
          <Route path="/faq" element={<FAQ />}/>
        </Routes>
      </Container>
    </div>
    
  );
}

export default App;
