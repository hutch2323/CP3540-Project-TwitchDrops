import './App.css';
import { Container, Row, Col, Image, CardGroup, Card, Button, Carousel } from 'react-bootstrap';
import { BsFillClockFill, BsDiamondFill } from "react-icons/bs"; 

// function used to determine the layout of the drop event(s)
export function EventLayout({drops=[]}, {event=[]}){
    return(
    <Container className="py-3 pb-5">
        {/* Logic to determine whether or not a carousel is needed. If only one event, no carousel */}
        {drops.length > 0 ? 
            <>
                {drops.length > 1 ? 
                <Carousel variant="dark">
                    { drops.map((event, i) => { return ( 
                        <Carousel.Item key={i}>
                            <Events key={i} info={event} />
                        </Carousel.Item>
                    )}) }   
                </Carousel>
                :
                <>
                    { drops.map((event, i) => { return ( 
                            <Events key={i} info={event} />
                    )}) }   
                </>
            }
            </>
        :
            <Container className="p-5 mb-2 rounded-3">
                <Row className="rounded-3 pt-3 pb-3 g-4 m-auto mb-3 justify-content-center" style={{backgroundColor:"rgba(0, 0, 0, 0.5)", color:"white", fontSize:"20px", fontFamily:"Timeless-Normal"}}>
                <p className="m-auto" style={{fontSize:"35px", color:"#FFF76F"}}>No Drops Available</p>
                <p className="m-auto"><BsDiamondFill color="#FFF76F"/> Check again soon for events! <BsDiamondFill color="#FFF76F"/></p>
            </Row> 
            </Container>
        }                 
    </Container>
    )
}

// function used to display current, past or future event
export function Events(props){
    let today = new Date();
    let timeLeft = null;
    let eventStatus = "";
  
    // used to determine whether the event is current or future/past
    if ((new Date(props.info.start_date) <= today) && (new Date(props.info.end_date) >= today)){
      timeLeft = calculateTimeRemaining(props.info.end_date)
      eventStatus = "current";
    } else {
      if (Math.floor((new Date(props.info.start_date) - today)/ (1000 * 60 * 60 * 24)) <= 999){
        timeLeft = calculateTimeRemaining(props.info.start_date);
      }
    }
    
    // return will render the event and execute the mapping function to display each twitch drop
    return(
        <Container className="p-5 mb-2 rounded-3">
          <Row className="rounded-3 pt-3 pb-3 g-4 m-auto mb-3 justify-content-center" style={{backgroundColor:"rgba(0, 0, 0, 0.5)", color:"white", fontSize:"20px", fontFamily:"Timeless-Normal"}}>
            <p className="m-auto" style={{fontSize:"35px", color:"#FFF76F"}}>{(props.info.name).toUpperCase()}</p>
            <p className="m-auto"><BsDiamondFill color="#FFF76F"/> {props.info.start_date} - {props.info.end_date} <BsDiamondFill color="#FFF76F"/></p>
            {/* If time left is not null (aka the event is not in the past), display the countdown */}
            {timeLeft != null && (
              <>
                {/* 
                    Logic to determine whether it is a current or future event. Current events have "Event Ends In" tag while 
                    future will have "Event Begins In" 
                */}
                {((new Date(props.info.start_date) <= today) && (new Date(props.info.end_date) >= today)) ? 
                    <p style={{fontSize:"24px", color:"#FFF76F"}}>Event Ends In:</p> 
                : 
                    <p style={{fontSize:"24px", color:"#FFF76F"}}>Event Begins In:</p>
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

// function used to display each twitch drop
export function TwitchDrops(props) {
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
                      className="streamButton"
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
  
// function that handles displaying the countdown for current/future events
export function CountDownDisplay({timeLeft=[]}){
    return(
        <Row className="m-auto d-flex justify-content-center" style={{maxWidth:"720px"}}>
            <Col className="m-2 countDownColumn">
                <Row>
                    <Container className="d-flex justify-content-center text-light countDownRowHeader">
                        DAYS
                    </Container> 
                </Row>
                <Row>
                    <Container className="d-flex justify-content-center text-light countDownRowNumber">
                        {timeLeft.days}
                    </Container> 
                </Row>
            </Col>
            <Col className="m-2 countDownColumn">
                <Row>
                    <Container className="d-flex justify-content-center text-light countDownRowHeader">
                        HOURS
                    </Container> 
                </Row>
                <Row>
                    <Container className="d-flex justify-content-center text-light countDownRowNumber">
                        {timeLeft.hours}
                    </Container> 
                </Row>
            </Col>
            <Col className="m-2 countDownColumn">
                <Row>
                    <Container className="d-flex justify-content-center text-light countDownRowHeader">
                        MINUTES
                    </Container> 
                </Row>
                <Row>
                    <Container className="d-flex justify-content-center text-light countDownRowNumber">
                        {timeLeft.minutes}
                    </Container> 
                </Row>
            </Col>
            <Col className="m-2 countDownColumn">
                <Row>
                    <Container className="d-flex justify-content-center text-light countDownRowHeader">
                        SECONDS
                    </Container> 
                </Row>
                <Row>
                    <Container className="d-flex justify-content-center text-light countDownRowNumber">
                        {timeLeft.seconds}
                    </Container> 
                </Row>
            </Col>
        </Row>
    )
}

// function used to calculate the time remaining until the end of a current event or the time remaining until a future event begins
export function calculateTimeRemaining(date){
    let timeLeft = {};
    if(date.length == 0){
      timeLeft = {days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00"}
    } else {
      let difference = +new Date(date) - +new Date();
      if (difference > 0) {
        timeLeft = {
          days: addZero(Math.floor(difference / (1000 * 60 * 60 * 24))),
          hours: addZero(Math.floor((difference / (1000 * 60 * 60)) % 24)),
          minutes: addZero(Math.floor((difference / 1000 / 60) % 60)),
          seconds: addZero(Math.floor((difference / 1000) % 60))
        }
      } else {
        return null;
      }
    }
    return timeLeft;
  }
  
  // function used to add leading zeros to countdown timer
  function addZero(time){
    if(time < 10){
      time = "0" + time
    }
    return time
  }

