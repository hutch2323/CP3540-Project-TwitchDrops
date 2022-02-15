import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, Image } from 'react-bootstrap';
import { BsClock } from "react-icons/bs"; 
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
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000);
  });
  
  return (
    <div className="App">
      <Container>
        <Routes>
          <Route path="/" element={<Current twitchDrops={twitchDrops} timeLeft={timeLeft}/>}/>
          <Route path="/pastdrops" element={<Past pastDrops={pastDrops}/>}/>
          <Route path="/faq" element={<FAQS faqs={faqs}/>}/>
        </Routes>
      </Container>
    </div>
      );
    }

const calculateTimeLeft = () => {
  let year = new Date().getFullYear();
  let difference = +new Date(`03/04/${year}`) - +new Date();
  let timeLeft = {};
  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }
  return timeLeft;
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

export function PastDrops(props) {
  return (
      <div>
          <Container className="bg-light rounded-3 p-3">
            <h3 className="mt-5">{props.info.question}</h3>
            {props.info.answer}
          </Container>
      </div>
  );
}

export default App;
