import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Container, Row, Image, CardGroup, Card, Button} from 'react-bootstrap';
import { BsFillClockFill, BsDiamondFill } from "react-icons/bs"; 
import { Current, Past, Future, FAQS, Accounts, CountDownDisplay } from "./pages";
import CardHeader from 'react-bootstrap/esm/CardHeader';

function App() {

  const [twitchDrops, setTwitchDrops] = useState(null);
  const [pastDrops, setPastDrops] = useState(null);
  const [futureDrops, setFutureDrops] = useState(null);
  const [faqs, setFAQS] = useState([]);
  const [isLinked, setIsLinked] = useState(false);
  const [steamUser, setSteamUser] = useState(null);
  const [twitchUser, setTwitchUser] = useState(null);

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

export function calculateTimeRemaining(startDate){
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
  // console.log("status:" + props.eventStatus);
  return (
    <Container>
      <CardGroup className="dropCard">
        <Card className="dropCardBackground">
          <Card.Body>
            <Card.Title className="p-2 text-light dropCardHeader">{(props.info.item_name).toUpperCase()}</Card.Title>
            <Card.Img variant="top" src={props.info.item_icon} />
            <Card.Text className="d-flex justify-content-center m-auto pt-2">
              <BsFillClockFill className="m-auto ms-0 me-0 pe-1" color="rgba(43, 36, 82, 0.75)" size="25px"/>
              <span className="m-auto ms-0 me-0" style={{color:"#2B2452"}}>{props.info.unlock_condition}</span>
            </Card.Text>
            {props.eventStatus === "current" && (
              <Card.Text className="d-flex justify-content-center m-auto pt-2">
                
                  <Button
                    style={{backgroundColor:"#822DFF", borderRadius:"6px", height:"55px", maxWidth:"250px", width:"100%", fontFamily:"Timeless-Normal", alignItems:"center"}}
                    variant="outline-*"
                    onClick = {() => window.location.href = props.info.streamer_account}
                  >
                    <Container className="d-flex justify-content-center p-0 m-0" style={{alignItems:"center", alignItems:"center", color:"white"}}>
                        <Image className="me-2" src="images/twitchLogo.png" height="25px" width="25px"/>
                        <span style={{fontSize:"18px"}}>{props.info.streamer_name}</span>
                    </Container>
                  </Button>
             
              </Card.Text>
            )}
          </Card.Body>
         </Card>
      </CardGroup>
    </Container>
  )
}

export function Events(props){
  let today = new Date();
  let timeLeft = null;
  let startDate = new Date(props.info.start_date);
  let endDate = new Date(props.info.end_date);
  let eventStatus = "";

  // console.log(props.info.name + ": " + startDate + " - " + endDate);

  if ((new Date(props.info.start_date) <= today) && (new Date(props.info.end_date) >= today)){
    timeLeft = calculateTimeRemaining(props.info.end_date)
    eventStatus = "current";
  } else {
    if (Math.floor((new Date(props.info.start_date) - today)/ (1000 * 60 * 60 * 24)) <= 999){
      timeLeft = calculateTimeRemaining(props.info.start_date);
    }
  }

  // console.log("timeleft: " + timeLeft);
  
  return(
      <Container className="p-5 mb-2 rounded-3">
        <Row className="rounded-3 pt-3 pb-3 g-4 m-auto mb-3 justify-content-center" style={{backgroundColor:"rgba(0, 0, 0, 0.5)", color:"white", fontSize:"20px", fontFamily:"Timeless-Normal"}}>
          <p className="m-auto" style={{fontSize:"35px", color:"#FFF76F"}}>{(props.info.name).toUpperCase()}</p>
          <p className="m-auto"><BsDiamondFill color="#FFF76F"/> {props.info.start_date} - {props.info.end_date} <BsDiamondFill color="#FFF76F"/></p>
          {timeLeft != null && (
            <>
              {((new Date(props.info.start_date) <= today) && (new Date(props.info.end_date) >= today)) ? 
              <p style={{fontSize:"24px", color:"#FFF76F"}}>Event Ends In:</p> : <p style={{fontSize:"24px", color:"#FFF76F"}}>Event Begins In:</p>
              }
              <CountDownDisplay timeLeft={timeLeft}/>
            </>
          )}    
        </Row>
        <Row xs={1} md={3} className="g-4 justify-content-center">
          { props.info.drops.map((twitchDrop, i) => { return <TwitchDrops key={i} info={twitchDrop} eventStatus={eventStatus}/>}) }   
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
