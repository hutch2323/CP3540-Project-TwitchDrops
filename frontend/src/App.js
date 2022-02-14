import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { BsClock } from "react-icons/bs"; 
import { Current } from "./pages";

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
          <Route path="/" element={<Current drops={twitchDrops}/>}/>
        </Routes>
      </Container>
    </div>
  );
}

export function TwitchDrops(props) {
  console.log(props);
  return (
    <>
      <div style={{display: "inline-block", margin: "2em"}}>
        <h2 className="mt-5">{props.info.streamer_name}</h2>
        <img rounded="true" src={props.info.item_icon}></img>
        <h3 className="fs-4 text-start">{props.info.item_name}</h3>
        <p><BsClock style={{paddingRight: "5px"}}/>{props.info.unlock_condition}</p>
      </div>
    </>
  )
}

export default App;
