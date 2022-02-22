import React, { useState } from 'react';
import { Container, Navbar, Nav, Row, Col, Image, Collapse, Button, Carousel } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FAQ, Events, } from './App';
import { BsDiamondFill } from 'react-icons/bs';

export function Current({twitchDrops=[], timeLeft=[]}) {
    //twitchDrops=[]
    //console.log(twitchDrops)
    let noDrops = "none"
    let timerDisplay = "true"
    if (twitchDrops.length == 0){
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
            <Container fluid className="ps-0 pe-0" style={{background:"url(images/websitebg.png)", backgroundPosition: "center", 
            backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", backgroundSize: "cover"}}>
                <Container fluid className="pt-5">
                    <Image src="images/twitchDrops.png" width="100%" style={{maxWidth:"800px"}}/>
                </Container>
                <Container fluid className="mt-5" style={{ padding:"20px", backgroundColor:"rgb(43, 36, 82, 0.5)"}}>
                    <Image src="images/currentEvent.png" width="100%" style={{maxWidth:"800px"}}/>
                    <Container  style={{  display: timerDisplay }}>
                        <CountDownDisplay timeLeft={timeLeft} /> 
                    </Container>
                     
                </Container>   
                <Container style={{  display: noDrops, padding:"25px", background:"url(images/main-image-alpha-snow.png)", backgroundSize:"100% 100%", verticalAlign:"middle"}}>
                    <h2 class="text-danger">There currently isn't any active drops. Check Future Drops page for the next drop date.</h2>
                </Container> 
                <Container className="py-3 pb-5">
                    <Container className="" style={{maxWidth:"320px", display: timerDisplay}}>
                        <Button href="https://www.twitch.tv/coachstock" variant="outline-*" className="mt-4 streamButton"></Button>
                    </Container>
                    <Carousel variant="dark"  style={{  display: timerDisplay }}>
                        { twitchDrops.map((event, i) => { return ( 
                            <Carousel.Item key={i}>
                                <Events key={i} info={event} />
                            </Carousel.Item>
                        )}) }   
                    </Carousel>
                                         
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
                    
                    <Image src="images/pastEvents.png" width="100%" style={{maxWidth:"800px"}}/>
                    {/* <CountDownDisplay timeLeft={timeLeft} />   */}
                </Container>    
                <Container className="py-3 pb-5">
                    <Carousel variant="dark">
                        { pastDrops.map((event, i) => { return ( 
                            <Carousel.Item key={i}>
                                <Events key={i} info={event} />
                            </Carousel.Item>
                        )}) }   
                    </Carousel>
                </Container>
            </Container>
            <Footer />
        </>
    )
}

export function Future({futureDrops=[]}) {
    //console.log("Current:")
    //console.log(futureDrops)
    //console.log(date.toLocaleDateString("en-US", options))
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
                    {/* <CountDownDisplay timeLeft={timeLeft} />   */}
                </Container> 
                <Container style={{  display: noDrops, padding:"25px", background:"url(images/main-image-alpha-snow.png)", backgroundSize:"100% 100%", verticalAlign:"middle"}}>
                    <h2 class="text-danger">"There currently isn't Future Drops. Check back again for future times."</h2>
                </Container>   
                <Container className="py-3 pb-5" style={{  display: timerDisplay }}>
                    <Carousel variant="dark">
                        { futureDrops.map((event, i) => { return ( 
                            <Carousel.Item key={i}>
                                <Events key={i} info={event} />
                            </Carousel.Item>
                        )}) }   
                    </Carousel>
                                       
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

export function Accounts({signedIn=[]}) {
    const [step1, setStep1] = useState(true);
    const [step2, setStep2] = useState(false);
    const [step3, setStep3] = useState(false);
    const [final, setFinal] = useState(false);

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
                    <Image src="images/twitchDrops.png" width="100%" style={{maxWidth:"800px"}}/>
                </Container>
                <Container fluid className="mt-5" style={{ padding:"20px", backgroundColor:"rgb(43, 36, 82, 0.75)"}}>
                    <Image src="images/linkAccounts.png" width="100%" style={{maxWidth:"800px"}}/>
                </Container>  
                <Container className="mt-5 p-5 rounded-3" style={{backgroundColor:"rgb(0, 0, 0, 0.75)", color:"white"}}>
                    <Row className="">
                        <Container>
                            <div id="sign-in">
                                <h4 className="pb-2"><b style={{color:""}}>Step 1</b>: Sign in to your Steam account</h4>
                                <Button
                                    style={{backgroundColor:"#1B2C43", borderRadius:"6px", height:"55px", maxWidth:"250px", width:"100%", fontFamily:"Timeless-Normal", alignItems:"center"}}
                                    onClick={() => {setStep2(!step2)}}
                                    aria-controls="sign-in"
                                    aria-expanded={step1}
                                    variant="outline-*"
                                >
                                    <Container className="d-flex justify-content-center p-0 m-0" style={{alignItems:"center", alignItems:"center", color:"white"}}>
                                        <Image className="me-2" src="images/steamLogo.png" height="25px" width="25px"/>
                                        <span>SIGN IN WITH STEAM</span>
                                    </Container>
                                    
                                </Button>
                            </div>
                        </Container>
                    </Row>
                    <Container className="p-5 d-flex justify-content-center">
                        <BsDiamondFill className="ms-3 me-3" color="#FFF76F"/>
                        <BsDiamondFill className="ms-3 me-3" color="#FFF76F"/>
                        <BsDiamondFill className="ms-3 me-3" color="#FFF76F"/>
                        <BsDiamondFill className="ms-3 me-3" color="#FFF76F"/>
                        <BsDiamondFill className="ms-3 me-3" color="#FFF76F"/>
                    </Container>
                    <Row className="">
                        <Container>
                            <div id="link">
                                <h4 className="pb-2"><b>Step 2</b>: Sign into your Twitch account</h4>
                                <Button
                                    style={{backgroundColor:"#822DFF", borderRadius:"6px", height:"55px", maxWidth:"250px", width:"100%", fontFamily:"Timeless-Normal", alignItems:"center"}}
                                    onClick={() => {setStep3(!step3)}}
                                    aria-controls="link"
                                    aria-expanded={step2}
                                    variant="outline-*"
                                    disabled={!step2}
                                >
                                    <Container className="d-flex justify-content-center p-0 m-0" style={{alignItems:"center", alignItems:"center", color:"white"}}>
                                        <Image className="me-2" src="images/twitchLogo.png" height="25px" width="25px"/>
                                        <span>SIGN IN WITH TWITCH</span>
                                    </Container>
                                    
                                </Button>
                            </div>
                        </Container>
                    </Row>
                    <Container className="p-5 d-flex justify-content-center">
                        <BsDiamondFill className="ms-3 me-3" color="#FFF76F"/>
                        <BsDiamondFill className="ms-3 me-3" color="#FFF76F"/>
                        <BsDiamondFill className="ms-3 me-3" color="#FFF76F"/>
                        <BsDiamondFill className="ms-3 me-3" color="#FFF76F"/>
                        <BsDiamondFill className="ms-3 me-3" color="#FFF76F"/>
                    </Container>
                    <Row className="">
                        <Container>
                            <div in="activate">
                                <h4 className="pb-2"><b>Step 3</b>: Activate Twitch Drops</h4>
                                <Button
                                style={{borderRadius:"6px", height:"55px", maxWidth:"250px", width:"100%", fontFamily:"Timeless-Normal"}}
                                onClick={() => {setFinal(!final)}}
                                aria-controls="activate"
                                aria-expanded={step3}
                                disabled={!step3}
                                >
                                    ACTIVATE DROPS
                                </Button>
                                </div>
                        </Container>
                    </Row>
                    {/* <Container className="p-5 d-flex justify-content-center">
                        <BsDiamondFill className="ms-3 me-3" color="#FFF76F"/>
                        <BsDiamondFill className="ms-3 me-3" color="#FFF76F"/>
                        <BsDiamondFill className="ms-3 me-3" color="#FFF76F"/>
                        <BsDiamondFill className="ms-3 me-3" color="#FFF76F"/>
                        <BsDiamondFill className="ms-3 me-3" color="#FFF76F"/>
                    </Container> */}
                    {/* <Row className="">
                        <Container>
                            <div in="final">
                                <h4>Congratulations, Project Winter Twitch Drops have been activated on your account!</h4>
                            </div>
                        </Container>
                    </Row> */}
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