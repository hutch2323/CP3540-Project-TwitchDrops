import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Container, Row, Image, CardGroup, Card } from 'react-bootstrap';
import { BsFillClockFill } from "react-icons/bs"; 
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

  
  const [timeLeft, setTimeLeft] = useState(null);
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

const calculateTimeLeft = (twitchDrops) => {
  // console.log(twitchDrops[0].end_date)
 
  let year = new Date().getFullYear();
  let difference = +new Date(twitchDrops[0].end_date) - +new Date();
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
  return (
    <Container>
      <CardGroup className="dropCard">
        <Card className="dropCardBackground">
          <Card.Body>
            <Card.Title className="p-2 text-light dropCardHeader">{(props.info.item_name).toUpperCase()}</Card.Title>
            <Card.Img variant="top" src={props.info.item_icon} />
            <Card.Text className="d-flex justify-content-center m-auto pt-2">
              <BsFillClockFill className="m-auto ms-0 me-0 pe-1" color="rgba(43, 36, 82, 0.75)" size="30px"/>
              <span className="m-auto ms-0 me-0">Watch Time: {props.info.unlock_condition}</span>
            </Card.Text>
          </Card.Body>
         </Card>
      </CardGroup>
    </Container>
  )
}

export function Events(props){
  return(
    <Container className="p-5 rounded-3">
      <Row className="pb-3 g-4 justify-content-center">
        {props.info.name}: {props.info.start_date} - {props.info.end_date}
      </Row>
      <Row xs={1} md={3} className="g-4 justify-content-center">
        { props.info.drops.map((twitchDrop, i) => { return <TwitchDrops key={i} info={twitchDrop} />}) }   
      </Row>
    </Container>
  )
} 
// export function PastDrops(props) {
//   return (
//       <div>
//           <CardGroup>
//             <Card>
//                 <Card.Img variant="top" src={props.info.item_icon}  />
//                 <Card.Body>
//                   <Card.Title>{props.info.item_name}</Card.Title>
//                   <Card.Text>
//                     Streamer: {props.info.streamer_name}
//                   </Card.Text>
//                   <Card.Text>
//                   <BsFillClockFill color="#2B2452" size="20px" style={{ paddingRight: "5px" }} />How Long to Watch: {props.info.unlock_condition}
//                   </Card.Text>
//                   <a href={props.info.streamer_account}><button type="button" className="btn btn-secondary">View {props.info.streamer_name}'s Page</button></a>
//                 </Card.Body>
//             </Card>
//           </CardGroup>  
//       </div>
//   );
// }

// export function FutureDrops(props) {
//   return (
//       <div>
//           <CardGroup>
//             <Card>
//                 <Card.Img variant="top" src={props.info.item_icon}  />
//                 <Card.Body>
//                   <Card.Title>{props.info.item_name}</Card.Title>
//                   <Card.Text>
//                     Streamer: {props.info.streamer_name}
//                   </Card.Text>
//                   <Card.Text>
//                     <BsFillClockFill color="#2B2452" size="20px" style={{ paddingRight: "5px" }} /> How Long to Watch: {props.info.unlock_condition}
//                   </Card.Text>
//                   <a href={props.info.streamer_account}><button type="button" className="btn btn-secondary">View {props.info.streamer_name}'s Page</button></a>
//                 </Card.Body>
//             </Card>
//           </CardGroup>  
//       </div>
//   );
// }

export function FAQ(props){
  return(
    <Container style={{ padding:"15px"}}>
      <Row>
          <h4 style={{color:"yellow"}}>{props.info.question}</h4>
      </Row>
      <Row>
          <p style={{overflowWrap:"break-word", color:"white"}}>{props.info.answer}</p>
      </Row>
    </Container>
  )
}

export default App;
