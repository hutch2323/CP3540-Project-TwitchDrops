import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Row, Col, Image, Collapse, Button, Carousel } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FAQ, Events, } from './App';
import { BsDiamondFill } from 'react-icons/bs';

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
                                <h4 className="pb-2"><b style={{color:""}}>Step 1</b>: Sign in to your Steam account</h4>
                                <Button
                                    style={{backgroundColor:"#1B2C43", borderRadius:"6px", height:"55px", maxWidth:"250px", width:"100%", fontFamily:"Timeless-Normal", alignItems:"center"}}
                                    onClick={() => {
                                        if(document.getElementById("steamButton").innerHTML == "SIGN OUT"){
                                            setSteamUser(null);                                            
                                            setStep2(false);                                            
                                            setStep3(false);
                                            document.getElementById("steamButton").innerHTML = "SIGN IN WITH STEAM"
                                            document.getElementById("steam").classList.remove('inactiveLink');
                                            document.getElementById("steam").classList.add('activeLink');

                                            if (document.getElementById("twitch").classList.contains('activeLink')){
                                                document.getElementById("twitch").classList.remove('activeLink');
                                                document.getElementById("twitch").classList.add('inactiveLink');
                                            }

                                            if (document.getElementById("activate").classList.contains('activeLink')){
                                                document.getElementById("activate").classList.remove('activeLink');
                                                document.getElementById("activate").classList.add('inactiveLink');
                                            }
                                        } else {
                                            if(twitchUser == null){
                                                setStep2(true);
                                                document.getElementById("twitch").classList.add('activeLink');
                                                document.getElementById("twitch").classList.remove('inactiveLink');
                                            } else {
                                                setStep3(true);
                                                document.getElementById("activate").classList.add('activeLink');
                                                document.getElementById("activate").classList.remove('inactiveLink');
                                            }
                                            // setStep1(!step1);
                                            document.getElementById("steam").classList.add('inactiveLink');
                                            document.getElementById("steam").classList.remove('activeLink');
                                            document.getElementById("steamButton").innerHTML = "SIGN OUT"
                                            setSteamUser("Steam Username");
                                        }
                                    }}
                                    aria-controls="sign-in"
                                    aria-expanded={step1}
                                    variant="outline-*"
                                    disabled={step1==false && steamUser==null}
                                >
                                    <Container className="d-flex justify-content-center p-0 m-0" style={{alignItems:"center", alignItems:"center", color:"white"}}>
                                        <Image className="me-2" src="images/steamLogo.png" height="25px" width="25px"/>
                                        {steamUser != null ?
                                            <span id="steamButton">SIGN OUT</span>
                                        :
                                            <span id="steamButton">SIGN IN WITH STEAM</span>
                                        }
                                    </Container>
                                    
                                </Button>
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
                    
                    <Row className="inactiveLink p-3" id="twitch">
                        <Container>
                            <div id="link">
                                <h4 className="pb-2"><b>Step 2</b>: Sign into your Twitch account</h4>
                                <Button
                                    style={{backgroundColor:"#822DFF", borderRadius:"6px", height:"55px", maxWidth:"250px", width:"100%", fontFamily:"Timeless-Normal", alignItems:"center"}}
                                    variant="outline-*"
                                    onClick={() => {
                                        
                                        if(document.getElementById("twitchButton").innerHTML == "SIGN OUT"){
                                            setTwitchUser(null);
                                            document.getElementById("twitchButton").innerHTML = "SIGN IN WITH TWITCH"

                                            if (document.getElementById("steam").classList.contains('inactiveLink')){
                                                document.getElementById("twitch").classList.remove('inactiveLink');
                                                document.getElementById("twitch").classList.add('activeLink');
                                                setStep2(true);
                                            }

                                            if (document.getElementById("activate").classList.contains('activeLink')){
                                                document.getElementById("activate").classList.remove('activeLink');
                                                document.getElementById("activate").classList.add('inactiveLink');
                                            }   
                                        } else {
                                            setStep3(false);
                                            setStep2(true);
                                            document.getElementById("activate").classList.add('activeLink');
                                            document.getElementById("activate").classList.remove('inactiveLink');
                                            document.getElementById("twitch").classList.add('inactiveLink');
                                            document.getElementById("twitch").classList.remove('activeLink');
                                            document.getElementById("twitchButton").innerHTML = "SIGN OUT"
                                            setTwitchUser("Twitch Username");
                                        }
                                                    
                                    }}
                                    aria-controls="sign-in"
                                    aria-expanded={step2}
                                    disabled={(step2==false && twitchUser==null)}
                                >
                                    <Container className="d-flex justify-content-center p-0 m-0" style={{alignItems:"center", alignItems:"center", color:"white"}}>
                                        <Image className="me-2" src="images/twitchLogo.png" height="25px" width="25px"/>
                                        {twitchUser != null ?
                                            <span id="twitchButton">SIGN OUT</span>
                                        :
                                            <span id="twitchButton">SIGN IN WITH TWITCH</span>
                                        }
                                    </Container>
                                    
                                </Button>
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
                        <Container>
                            <div in="activate">
                                <h4 className="pb-2"><b>Step 3</b>: Activate Twitch Drops</h4>
                                <Button
                                style={{borderRadius:"6px", height:"55px", maxWidth:"250px", width:"100%", fontFamily:"Timeless-Normal"}}
                                onClick={() => {
                                    if (document.getElementById("activateButton").innerHTML == "UNLINK ACCOUNTS"){
                                        document.getElementById("steam").classList.add('activeLink');
                                        document.getElementById("steam").classList.remove('inactiveLink');
                                        document.getElementById("activate").classList.add('inactiveLink');
                                        document.getElementById("activate").classList.remove('activeLink');
                                        document.getElementById("steamButton").innerHTML = "SIGN IN WITH STEAM";
                                        document.getElementById("twitchButton").innerHTML = "SIGN IN WITH TWITCH";
                                        document.getElementById("activateButton").innerHTML = "ACTIVATE DROPS";
                                        setSteamUser(null);
                                        setTwitchUser(null);
                                        setIsLinked(false);
                                        setStep3(false);
                                        setStep2(false);
                                        setStep1(true);
                                    } else {
                                        document.getElementById("activateButton").innerHTML = "UNLINK ACCOUNTS";
                                        setIsLinked(true);
                                        window.scrollTo(0, 0);
                                    }
                                }}
                                aria-controls="activate"
                                aria-expanded={step3}
                                disabled={twitchUser == null || steamUser == null}
                                >
                                    {isLinked ?
                                        <span id="activateButton">UNLINK ACCOUNTS</span>
                                    :
                                        <span id="activateButton">ACTIVATE DROPS</span>
                                    }
                                </Button>
                            </div>
                        </Container>
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