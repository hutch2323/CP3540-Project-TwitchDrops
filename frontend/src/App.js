import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { BsClock } from "react-icons/bs"; 

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
      <Container className="bg-light">
        <h1>Twitch Drops</h1>
        { twitchDrops.map((twitchDrop, i) => { return <TwitchDrops key={i} info={twitchDrop}></TwitchDrops>}) }
      </Container>
    </div>
  );
}

function TwitchDrops(props) {
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
