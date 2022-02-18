import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Container, Row, Image, CardGroup, Card } from 'react-bootstrap';
import { BsClock } from "react-icons/bs"; 
import { Current, Past, Future, FAQS, Accounts } from "./pages";
import CardHeader from 'react-bootstrap/esm/CardHeader';

function App() {

  const [twitchDrops, setTwitchDrops] = useState(null);
  const [pastDrops, setPastDrops] = useState(null);
  const [futureDrops, setFutureDrops] = useState(null);
  const [faqs, setFAQS] = useState([]);

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

  
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000);
  });

  if( twitchDrops == null) return null;
  if( pastDrops == null) return null;
  if( futureDrops == null) return null;
  
  return (
    <div className="App">
      <Container fluid className="p-0" style={{background:"url(images/websitebg.png)"}}>
        <Routes>
          <Route path="/" element={<Current twitchDrops={twitchDrops} timeLeft={timeLeft}/>}/>
          <Route path="/pastdrops" element={<Past pastDrops={pastDrops}/>}/>
          <Route path="/futureDrops" element={<Future futureDrops={futureDrops}/>}/>
          <Route path="/faq" element={<FAQS faqs={faqs}/>}/>
          <Route path="/linkaccounts" element={<Accounts />} />
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

  //console.log("testing", props);
  // console.log(props.info.streamer_account)
  return (
    <div>
      <CardGroup style={{borderRadius:"0.5rem",boxShadow:"0.5rem 0.5rem 1rem #2B2452"}}>
        <Card style={{backgroundColor:"rgba(255, 255, 255, 0.5)"}}>
          <Card.Img variant="top" src={props.info.item_icon} />
          <Card.Body style={{}}>
            <Card.Title>{props.info.item_name}</Card.Title>
            <Card.Text>
            Streamer: {props.info.streamer_name}
            </Card.Text>
            <Card.Text>
            <BsClock style={{ paddingRight: "5px" }} /> How Long to Watch: {props.info.unlock_condition}
            </Card.Text>
          </Card.Body>
          <a href={props.info.streamer_account}><button type="button" className="btn btn-secondary">View {props.info.streamer_name}'s Page</button></a>
        </Card>
      </CardGroup>
    </div>
  )
}

export function PastDrops(props) {
  return (
      <div>
          <CardGroup>
            <Card>
                <Card.Img variant="top" src={props.info.item_icon}  />
                <Card.Body>
                  <Card.Title>{props.info.item_name}</Card.Title>
                  <Card.Text>
                    Streamer: {props.info.streamer_name}
                  </Card.Text>
                  <Card.Text>
                  <BsClock style={{ paddingRight: "5px" }} /> How Long to Watch: {props.info.unlock_condition}
                  </Card.Text>
                  <a href={props.info.streamer_account}><button type="button" className="btn btn-secondary">View {props.info.streamer_name}'s Page</button></a>
                </Card.Body>
            </Card>
          </CardGroup>  
      </div>
  );
}

export function FutureDrops(props) {
  return (
      <div>
          <CardGroup>
            <Card>
                <Card.Img variant="top" src={props.info.item_icon}  />
                <Card.Body>
                  <Card.Title>{props.info.item_name}</Card.Title>
                  <Card.Text>
                    Streamer: {props.info.streamer_name}
                  </Card.Text>
                  <Card.Text>
                  <BsClock style={{ paddingRight: "5px" }} /> How Long to Watch: {props.info.unlock_condition}
                  </Card.Text>
                  <a href={props.info.streamer_account}><button type="button" className="btn btn-secondary">View {props.info.streamer_name}'s Page</button></a>
                </Card.Body>
            </Card>
          </CardGroup>  
      </div>
  );
}

export function FAQ(props){
  return(
    <Container style={{ padding:"15px"}}>
      <Row>
          <h4>{props.info.question}</h4>
      </Row>
      <Row>
          <p style={{overflowWrap:"break-word"}}>{props.info.answer}</p>
      </Row>
    </Container>
  )
}

export default App;
