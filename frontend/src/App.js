import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Container, Row, Image, CardGroup, Card, Carousel } from 'react-bootstrap';
import { BsFillClockFill, BsDiamondFill } from "react-icons/bs"; 
import { Current, Past, Future, FAQS, Accounts, CountDownDisplay } from "./pages";
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
  //console.log(twitchDrops)
  let timeLeft = {};
  if(twitchDrops.length == 0){
    timeLeft = {days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00"}
  }else{
      let difference = +new Date(twitchDrops[0].end_date) - +new Date();
      if (difference > 0) {
        timeLeft = {
          days: addZero(Math.floor(difference / (1000 * 60 * 60 * 24))),
          hours: addZero(Math.floor((difference / (1000 * 60 * 60)) % 24)),
          minutes: addZero(Math.floor((difference / 1000 / 60) % 60)),
          seconds: addZero(Math.floor((difference / 1000) % 60))
        };
      }else {
    return null;
      }
  }
    return timeLeft;
}

export function calculateToEventStart(startDate){
let timeLeft = {};
if(startDate.length == 0){
  timeLeft = {days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00"}
}else{
  let difference = +new Date(startDate) - +new Date();
  if (difference > 0) {
    timeLeft = {
      days: addZero(Math.floor(difference / (1000 * 60 * 60 * 24))),
      hours: addZero(Math.floor((difference / (1000 * 60 * 60)) % 24)),
      minutes: addZero(Math.floor((difference / 1000 / 60) % 60)),
      seconds: addZero(Math.floor((difference / 1000) % 60))
    };
  } else {
    return null;
  }
}
  return timeLeft;
}

function addZero(time){
  if(time < 10){
    time = "0" + time
  }
  return time
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
  let timeLeft = calculateToEventStart(props.info.start_date);
  
  return(
      <Container className="p-5 mb-2 rounded-3">
        <Row className="rounded-3 pt-3 pb-3 g-4 m-auto mb-3 justify-content-center" style={{backgroundColor:"rgba(0, 0, 0, 0.5)", color:"white", fontSize:"20px", fontFamily:"Timeless-Normal"}}>
          <p className="m-auto" style={{fontSize:"35px", color:"#FFF76F"}}>{(props.info.name).toUpperCase()}</p>
          <p className="m-auto"><BsDiamondFill color="#FFF76F"/> {props.info.start_date} - {props.info.end_date} <BsDiamondFill color="#FFF76F"/></p>
          {timeLeft != null && <CountDownDisplay timeLeft={timeLeft}/>}    
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
    <Container className="p-5" style={{background:"url(images/main-image-alpha-snow.png)", backgroundSize:"100% 100%", verticalAlign:"middle"}}>
      <Row className="p-3">
          
          <h5 className="pb-2" style={{color:"#FFF76F"}}>{props.info.question}</h5>
          <Container className="pb-3">
            <BsDiamondFill color="#2B2452"/><BsDiamondFill color="#2B2452"/><BsDiamondFill color="#2B2452"/><BsDiamondFill color="#2B2452"/><BsDiamondFill color="#2B2452"/>
          </Container>
          
          <p style={{overflowWrap:"break-word", color:"white"}}>{props.info.answer}</p>
      </Row>
    </Container>
  )
}

export default App;
