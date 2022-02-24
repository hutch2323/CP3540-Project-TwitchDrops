import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Current } from "./pages/currentDrops";
import { Past } from "./pages/pastDrops";
import { Future } from "./pages/futureDrops";
import { FAQS } from "./pages/faq"
import { Accounts } from "./pages/linkAccounts"

export default function App() {

  const [twitchDrops, setTwitchDrops] = useState(null);
  const [pastDrops, setPastDrops] = useState(null);
  const [futureDrops, setFutureDrops] = useState(null);
  const [faqs, setFAQS] = useState([]);
  const [isLinked, setIsLinked] = useState(false);
  const [steamUser, setSteamUser] = useState(null);
  const [twitchUser, setTwitchUser] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00"
  });

  useEffect(() => {
    fetch('/api/currentTwitchDrops')
      .then((response) => response.json())
      .then(setTwitchDrops)
  }, []);

  useEffect(() => {
    fetch('/api/pastTwitchDrops')
      .then((response) => response.json())
      .then(setPastDrops)
  }, []);

  useEffect(() => {
    fetch('/api/futureTwitchDrops')
      .then((response) => response.json())
      .then(setFutureDrops)
  }, []);

  useEffect(() => {
    fetch('/api/faqs')
      .then((response) => response.json())
      .then(setFAQS)
  }, []);

  useEffect(() => {
    if((twitchUser == null) || (steamUser == null)){
      setIsLinked(false);
    }
  }, [twitchUser, steamUser]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if( twitchDrops == null) return null;
      setTimeLeft(calculateTimeLeft(twitchDrops))
    }, 1000);
  });

  if( twitchDrops == null) return null;
  if( pastDrops == null) return null;
  if( futureDrops == null) return null;
  if( timeLeft == null) return null;
  
  return (
    <div className="App">
      <Container fluid className="p-0">
        <Routes>
          <Route path="/" element={<Current twitchDrops={twitchDrops}/>}/>
          <Route path="/pastdrops" element={<Past pastDrops={pastDrops}/>}/>
          <Route path="/futureDrops" element={<Future futureDrops={futureDrops}/>}/>
          <Route path="/faq" element={<FAQS faqs={faqs}/>}/>
          <Route path="/linkaccounts" element={<Accounts isLinked={isLinked} steamUser={steamUser} twitchUser={twitchUser}
            setIsLinked={setIsLinked} setSteamUser={setSteamUser} setTwitchUser={setTwitchUser}/>} 
          />
        </Routes>
      </Container>
    </div>
  );
}

const calculateTimeLeft = (twitchDrops) => {
  let timeLeft = {};
  if(twitchDrops.length == 0){
    timeLeft = {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00"}
  } else {
      let difference = +new Date(twitchDrops[0].end_date) - +new Date();
      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      } else {
        return null;
      }
  }
    return timeLeft;
}