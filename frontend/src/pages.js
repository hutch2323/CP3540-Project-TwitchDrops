import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Row, Col, Image, Collapse, Button, Carousel } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FAQ, Events, } from './App';
import { BsDiamondFill } from 'react-icons/bs';
import { useSearchParams } from "react-router-dom";
import { useToken } from './auth/useToken';
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';

export function Current({twitchDrops=[], timeLeft=[]}) {
    return (
        <>
            <Container fluid>
                <Row>
                    <Title />
                </Row>
                <Row>
                    <Navigation />
                </Row>
            </Container>
            <Container fluid className="ps-0 pe-0" style={{background:"url(images/websitebg.png)", backgroundPosition: "center", 
            backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", backgroundSize: "cover"}}>
                <Container fluid className="pt-5">
                    <Image src="images/twitchDrops.png" width="100%" style={{maxWidth:"800px"}}/>
                </Container>
                <Container fluid className="mt-5" style={{ padding:"20px", backgroundColor:"rgb(43, 36, 82, 0.75)"}}>
                    <Image src="images/currentEvent.png" width="100%" style={{maxWidth:"800px"}}/>   
                </Container>    
                <Container className="py-3 pb-5">
                    {twitchDrops.length > 0 ? 
                        <>
                            {twitchDrops.length > 1 ? 
                            <Carousel variant="dark">
                                { twitchDrops.map((event, i) => { return ( 
                                    <Carousel.Item key={i}>
                                        <Events key={i} info={event} />
                                    </Carousel.Item>
                                )}) }   
                            </Carousel>
                            :
                            <>
                                { twitchDrops.map((event, i) => { return ( 
                                        <Events key={i} info={event} />
                                )}) }   
                            </>
                        }
                        </>
                    :
                        <Container className="p-5 mb-2 rounded-3">
                            <Row className="rounded-3 pt-3 pb-3 g-4 m-auto mb-3 justify-content-center" style={{backgroundColor:"rgba(0, 0, 0, 0.5)", color:"white", fontSize:"20px", fontFamily:"Timeless-Normal"}}>
                            <p className="m-auto" style={{fontSize:"35px", color:"#FFF76F"}}>No Drops Available</p>
                            <p className="m-auto"><BsDiamondFill color="#FFF76F"/> Check Future Drops for upcoming events! <BsDiamondFill color="#FFF76F"/></p>
                        </Row> 
                        </Container>
                    }      
                                         
                </Container>
                
            </Container>
            <Footer />
        </>
    )
}

export function Past({pastDrops=[]}) {
    return (
        <>
            <Container fluid>
                <Row>
                    <Title />
                </Row>
                <Row>
                    <Navigation />
                </Row>
            </Container>

            <Container fluid className="ps-0 pe-0" style={{background:"url(images/wood-chopping.png)", backgroundPosition: "center", 
            backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", backgroundSize: "cover"}}>
                <Container fluid className="pt-5">
                    <Image src="images/twitchDrops.png" width="100%" style={{maxWidth:"800px"}}/>
                </Container>
                <Container fluid className="mt-5" style={{ padding:"20px", backgroundColor:"rgb(43, 36, 82, 0.75)"}}>
                    
                    <Image src="images/pastEvents.png" width="100%" style={{maxWidth:"675px"}}/>
                </Container>    
                <Container className="py-3 pb-5">
                    {pastDrops.length > 0 ? 
                        <>
                            {pastDrops.length > 1 ? 
                            <Carousel variant="dark">
                                { pastDrops.map((event, i) => { return ( 
                                    <Carousel.Item key={i}>
                                        <Events key={i} info={event} />
                                    </Carousel.Item>
                                )}) }   
                            </Carousel>
                            :
                            <>
                                { pastDrops.map((event, i) => { return ( 
                                        <Events key={i} info={event} />
                                )}) }   
                            </>
                        }
                        </>
                    :
                        <Container className="p-5 mb-2 rounded-3">
                            <Row className="rounded-3 pt-3 pb-3 g-4 m-auto mb-3 justify-content-center" style={{backgroundColor:"rgba(0, 0, 0, 0.5)", color:"white", fontSize:"20px", fontFamily:"Timeless-Normal"}}>
                            <p className="m-auto" style={{fontSize:"35px", color:"#FFF76F"}}>No Drops Available</p>
                            <p className="m-auto"><BsDiamondFill color="#FFF76F"/> Check again soon for event history! <BsDiamondFill color="#FFF76F"/></p>
                        </Row> 
                        </Container>
                    }                 
                </Container>
            </Container>
            <Footer />
        </>
    )
}

export function Future({futureDrops=[]}) {
    const testing = 0
    let noDrops = "none"
    let timerDisplay = "true"
    if (futureDrops.length == 0){
        noDrops = "true"
        timerDisplay = "none"
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Title />
                </Row>
                <Row>
                    <Navigation />
                </Row>
            </Container>
            <Container fluid className="ps-0 pe-0" style={{background:"url(images/hunting.png)", backgroundPosition: "center", 
            backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", backgroundSize: "cover"}}>
                <Container fluid className="pt-5">
                    <Image src="images/twitchDrops.png" width="100%" style={{maxWidth:"800px"}}/>
                </Container>
                <Container fluid className="mt-5" style={{ padding:"20px", backgroundColor:"rgb(43, 36, 82, 0.75)"}}> 
                    <Image src="images/futureEvents.png" width="100%" style={{maxWidth:"800px"}}/>
                </Container>   
                <Container className="py-3 pb-5">
                    {futureDrops.length > 0 ? 
                        <>
                            {futureDrops.length > 1 ? 
                            <Carousel variant="dark">
                                { futureDrops.map((event, i) => { return ( 
                                    <Carousel.Item key={i}>
                                        <Events key={i} info={event} />
                                    </Carousel.Item>
                                )}) }   
                            </Carousel>
                            :
                            <>
                                { futureDrops.map((event, i) => { return ( 
                                        <Events key={i} info={event} />
                                )}) }   
                            </>
                        }
                        </>
                    :
                        <Container className="p-5 mb-2 rounded-3">
                            <Row className="rounded-3 pt-3 pb-3 g-4 m-auto mb-3 justify-content-center" style={{backgroundColor:"rgba(0, 0, 0, 0.5)", color:"white", fontSize:"20px", fontFamily:"Timeless-Normal"}}>
                            <p className="m-auto" style={{fontSize:"35px", color:"#FFF76F"}}>No Drops Available</p>
                            <p className="m-auto"><BsDiamondFill color="#FFF76F"/> Check again soon for upcoming events! <BsDiamondFill color="#FFF76F"/></p>
                        </Row> 
                        </Container>
                    }                 
                </Container>
            </Container>
            <Footer />
        </>
    )
}

export function FAQS({faqs=[]}) {
    // console.log("Current:")
    // console.log(faqs)
    return (
        <>
            <Container fluid>
                <Row>
                    <Title />
                </Row>
                <Row>
                    <Navigation />
                </Row>
            </Container>
            <Container fluid className="p-0 pb-5" style={{background:"url(images/camp-fire.png)", backgroundPosition: "center", 
            backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", backgroundSize: "cover"}}>
            <Container fluid className="pt-5">
                    <Image src="images/twitchDrops.png" width="100%" style={{maxWidth:"800px"}}/>
                </Container>
                <Container fluid className="mt-5" style={{ padding:"20px", backgroundColor:"rgb(0, 0, 0, 0.65)"}}>
                    <Image className="pt-3" src="images/faqs.png" width="100%" style={{maxWidth:"800px"}}/>
                </Container>
                <Container className="pt-3 rounded-3" >
                        {faqs.map( (faq, i) => { return <FAQ key={i} info={faq} />})}
                </Container>
            </Container>
            <Footer />
        </>
    )
}

export function Accounts({isLinked=false, twitchUser=null, steamUser=null, setIsLinked, setTwitchUser, setSteamUser}) {
    const history = useNavigate()
  const [twitchOauthURL, setTwitchOauthURL] = useState('');
  const [steamAuthURL, setSteamAuthURL] = useState('');

  const localStoreToken = localStorage.getItem("token");
  console.log(localStoreToken );
  
  const [searchParams] = useSearchParams();
  const tokenQueryParam = searchParams.get("token");
  const steamIdQueryParam = searchParams.get("openid.claimed_id");
  console.log(steamIdQueryParam);
  
  useEffect(() => {
    if( steamIdQueryParam ) {
      let lastSlashCharPos = steamIdQueryParam.lastIndexOf("/");
      let steamid = steamIdQueryParam.substr(lastSlashCharPos+1);
      console.log(steamid);
      fetch('/api/auth/steam', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( {usr: getPayloadFromToken(token), steamid: steamid}),
      })
      .then((response) => response.json())
      .then((jsonData) => { 
        console.log(jsonData);
        if( jsonData.token) {
          localStorage.setItem('token', jsonData.token);
          setToken(jsonData.token);
        }
        history('/linkaccounts');
      })
      .catch(e => {
        console.log(e);
      })
    }
  }, []);
  
  const getPayloadFromToken = token => {
    const encodedPayload = token.split('.')[1];
    const buff = Buffer.from(encodedPayload, 'base64');
    const text = buff.toString('ascii');
    return JSON.parse(text);
  }

  const [token, setToken] = useToken();

  useEffect(() => {
    if( tokenQueryParam ) {
      localStorage.setItem('token', tokenQueryParam);
      const queryParams = new URLSearchParams(window.location.search)
      queryParams.delete('token')
      history('/linkaccounts');
      setToken(tokenQueryParam);
    }
  }, []);
  
  
  useEffect(() => {
      fetch('/auth/twitch/url')
      .then((response) => response.json())
      .then(setTwitchOauthURL)
  }, []);

  useEffect(() => {
    fetch('/auth/steam/url')
    .then((response) => response.json())
    .then(setSteamAuthURL)
}, []);


  const logoutSteam = () => {
    fetch('/auth/steam/logout', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( {usr: getPayloadFromToken(token)}),
    })
    .then((response) => response.json())
    .then((jsonData) => { 
      console.log(jsonData);
      if( jsonData.token ) {
        localStorage.setItem('token', jsonData.token);
        setToken(jsonData.token);
      }
      else {
        localStorage.removeItem('token');
        setToken(null);
      }
    })
    .catch(e => {
        console.log(e);
      })
  }

  const logoutTwitch = () => {
    fetch('/auth/twitch/logout', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( {usr: getPayloadFromToken(token)}),
    })
      .then((response) => { 
        if( response.ok) { 
            localStorage.removeItem('token');
           setToken(null)
        }
      })
      .catch(e => {
        console.log(e);
      })
  }
    
    
    const [step1, setStep1] = useState(true);
    const [step2, setStep2] = useState(false);
    const [step3, setStep3] = useState(false);
    const [final, setFinal] = useState(false);

    useEffect(() => {
        if (isLinked){
        setStep1(true);
        setStep2(true);
        setStep3(true);
        }
    })

    return (
        <>
        
            <Container fluid>
                <Row>
                    <Title />
                </Row>
                <Row>
                    <Navigation />
                </Row>
            </Container>
            <Container fluid className="ps-0 pe-0 pb-5" style={{background:"url(images/background_store.jpg)", backgroundPosition: "center", 
            backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", backgroundSize: "cover"}}>
                <Container fluid className="pt-5">
                    {!isLinked ? 
                        <Image src="images/twitchDrops.png" width="100%" style={{maxWidth:"800px"}}/>
                    :
                        <Image src="images/twitchDropsActivated.png" width="100%" style={{maxWidth:"800px"}}/>
                    }
                </Container>

                
                <Container fluid className="mt-5" style={{ padding:"20px", backgroundColor:"rgb(43, 36, 82, 0.75)"}}>
                    <Image src="images/linkAccounts.png" width="100%" style={{maxWidth:"800px"}}/>
                </Container>  
                <Container className="mt-5 p-5 rounded-3" style={{backgroundColor:"rgb(0, 0, 0, 0.75)", color:"white"}}>
                    <Row className={!isLinked && steamUser==null ? "activeLink p-3" : "inactiveLink p-3"} id="steam">
                        <Container>
                            <div id="sign-in">
                           
                                
                                <h4 className="pb-2"><b style={{color:""}}>Step 1</b>: Sign in to your Twitch account</h4>
                                <button disabled={!twitchOauthURL} 
        onClick={() => {
          token != null ? logoutTwitch()
          : window.location.href = twitchOauthURL.url }}
      >{token != null ? `${getPayloadFromToken(token).display_name} :logout` : "Login to Twitch"}</button>
                            </div>
                        </Container>
                        {steamUser != null &&
                            <Container>
                                <p className="m-auto" style={{fontSize:"24px", color:"#FFF76F"}}>{steamUser}</p>
                            </Container>
                        }
                    </Row>
                    <Row>
                        <Container className="diamondContainer p-5 d-flex justify-content-center">
                        <BsDiamondFill className="diamond ms-3 me-3" color="#FFF76F"/>
                        <BsDiamondFill className="diamond ms-3 me-3" color="#FFF76F"/>
                        <BsDiamondFill className="diamond ms-3 me-3" color="#FFF76F"/>
                        <BsDiamondFill className="diamond ms-3 me-3" color="#FFF76F"/>
                        <BsDiamondFill className="diamond ms-3 me-3" color="#FFF76F"/>
                    </Container>
                    </Row>
                    
                    <Row className="p-3" id="twitch">
                        <Container>
                            <div id="link">
                                <h4 className="pb-2"><b>Step 2</b>: Sign into your Steam account</h4>
                                <button disabled={token == null || !steamAuthURL}
        onClick={() => {
          token != null && getPayloadFromToken(token).steamid != null ? logoutSteam()
          : window.location.href = steamAuthURL.url //</div>"https://steamcommunity.com/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.return_to=https://localhost:4000%2Fapi%2Fauth%2Fsteam&openid.realm=https://localhost:4000&openid.mode=checkid_setup";
        }}
      >{token != null && getPayloadFromToken(token).steamid ? `${getPayloadFromToken(token).steamid} :logout` : "Login to Steam"}</button>
                            </div>
                        </Container>
                        {twitchUser != null &&
                            <Container>
                                <p className="m-auto" style={{fontSize:"24px", color:"#FFF76F"}}>{twitchUser}</p>
                            </Container>
                        }
                    </Row>
                    <Row>
                       <Container className="diamondContainer p-5 d-flex justify-content-center">
                        <BsDiamondFill className="diamond ms-3 me-3" color="#FFF76F"/>
                        <BsDiamondFill className="diamond ms-3 me-3" color="#FFF76F"/>
                        <BsDiamondFill className="diamond ms-3 me-3" color="#FFF76F"/>
                        <BsDiamondFill className="diamond ms-3 me-3" color="#FFF76F"/>
                        <BsDiamondFill className="diamond ms-3 me-3" color="#FFF76F"/>
                    </Container> 
                    </Row>
                    <Row className={isLinked ? "activeLink p-3" : "inactiveLink p-3"} id="activate">
                        
                    </Row>
                </Container>
            </Container>
            <Footer />
        </>
    )
}

export function Title() {
    return (
        <Container className="d-flex justify-content-center pt-2" style={{backgroundColor: "#2B2452" , color: "white"}}>
            <Image src="images/WinterLogoLong_White_Large.png" width="100%" className="float-start" style={{maxWidth:"320px"}}/>
        </Container>
    )
}

export function Navigation() {
    return (
        <Container className="navBarContainer">
            <Navbar variant="dark" className="navBarStyle" collapseOnSelect expand="sm">
                <Container className="w-100 d-flex justify-content-center">
                    <Navbar.Toggle aria-controls='response-navbar-nav' />
                    <Navbar.Collapse id='response-navbar-nav'>
                        <Nav className="container-fluid w-100 d-flex justify-content-center ps-0 pe-0" style={{alignItems:"center"}}>
                            <Nav.Item>
                                <LinkContainer to="/">
                                    <Nav.Link className="ms-1 me-1">CURRENT DROPS</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to="/pastdrops">
                                    <Nav.Link className="ms-1 me-1">PAST DROPS</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to="/futureDrops">
                                    <Nav.Link className="ms-1 me-1">FUTURE DROPS</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to="/faq">
                                    <Nav.Link className="ms-1 me-1">FAQ</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to="/linkaccounts">
                                    <Nav.Link className="ms-1 me-1">LINK ACCOUNTS</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                        </Nav>
                        </Navbar.Collapse>
                </Container>
            </Navbar>
        </Container>
    )
}

export function Footer() {
    return (
        <Container fluid className="p-3" style={{backgroundColor: "#2B2452" , color: "white"}}>
            <Row>
                <Col>
                    <Container className="imageContainer">
                        <Image src="images/facebook.png" height="60px" width="60px" className="imageDefault"/>
                        <a href="https://www.facebook.com/projwinter/">
                            <Image src="images/facebook-hover.png" height="60px" width="60px" className="imageHidden"/>
                        </a>
                    </Container> 
                </Col>
                <Col>
                    <Container className="imageContainer">
                        <Image src="images/twitter.png" height="60px" width="60px" className="imageDefault"/>
                        <a href="https://twitter.com/projwinter">
                            <Image src="images/twitter-hover.png" height="60px" width="60px" className="imageHidden"/>
                        </a>
                    </Container>
                </Col>
                <Col>
                    <Container className="imageContainer">
                        <Image src="images/instagram.png" height="60px" width="60px" className="imageDefault"/>
                        <a href="https://www.instagram.com/projwinter/">
                           <Image src="images/instagram-hover.png" height="60px" width="60px" className="imageHidden"/> 
                        </a>
                    </Container>
                </Col>
                <Col>
                    <Container className="imageContainer">
                        <Image src="images/reddit.png" height="60px" width="60px" className="imageDefault"/>
                        <a href="https://www.reddit.com/r/Project_Winter/">
                           <Image src="images/reddit-hover.png" height="60px" width="60px" className="imageHidden"/> 
                        </a>
                    </Container>
                </Col>
                <Col>
                    <Container className="imageContainer">
                        <Image src="images/discord.png" height="60px" width="60px" className="imageDefault"/>
                        <a href="https://discord.com/invite/projectwinter">
                            <Image src="images/discord-hover.png" height="60px" width="60px" className="imageHidden"/>
                        </a>
                    </Container>
                </Col>
                <Col>
                    <Container className="imageContainer">
                        <Image src="images/mail.png" height="60px" width="60px" className="imageDefault"/>
                        <a href="https://otherocean.us15.list-manage.com/subscribe?u=5acaca8ecc5599f7e55e6d3ef&id=302de80b05">
                            <Image src="images/mail-hover.png" height="60px" width="60px" className="imageHidden"/>
                        </a>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

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

function StartStringDate(drops){
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let dateStart = new Date(drops[0].start_date)
    let startString = dateStart.toLocaleDateString("en-US", options);
    return startString;
}

function EndStringDate(drops){
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let dateEnd = new Date(drops[0].end_date)
    let endString = dateEnd.toLocaleDateString("en-US", options);
    return endString;
}