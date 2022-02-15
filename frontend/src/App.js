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

  const [timeLeft, setTimeLeft] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
 
    }, 1000);
    console.log("timer", calculateTimeLeft())

    return calculateTimeLeft()
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

export default App;

const calculateTimeLeft = () => {
  let year = new Date().getFullYear();
  let difference = +new Date(`10/01/${year}`) - +new Date();

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


