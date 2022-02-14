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
    fetch('/api/twitchDrops')
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

export function TwitchDrops(props) {
  console.log(props);
  return (
    <Container className="text-light border-primary rounded-3 p-3" style={{backgroundColor: "blue"}}>
      <h2 className="mt-5">{props.info.streamer_name}</h2>
      <Image src={props.info.item_icon} thumbnail="true" />
      <h3 className="fs-4 text-start">{props.info.item_name}</h3>
      <p><BsClock style={{paddingRight: "5px"}}/>{props.info.unlock_condition}</p>
    </Container>
  )
}

export default App;
