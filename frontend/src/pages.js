import React, { useState } from 'react';
import { Container, Navbar, Nav, Row, Col, Image, Collapse, Button, } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FAQ, Events, } from './App';

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
            <Container fluid className="ps-0 pe-0" style={{background:"url(images/websitebg.png)"}}>
                <Container fluid className="pt-5">
                    <Image src="images/twitchDrops.png" width="100%" style={{maxWidth:"800px"}}/>
                </Container>
                <Container fluid className="mt-5" style={{ padding:"20px", backgroundColor:"rgb(43, 36, 82, 0.5)"}}>
                    
                    <Image src="images/currentEvent.png" width="100%" style={{maxWidth:"800px"}}/>
                    <CountDownDisplay timeLeft={timeLeft} />  
                </Container>    
                <Container className="py-3">
                    <Container className="" style={{maxWidth:"320px"}}>
                        <Button href="https://www.twitch.tv/coachstock" variant="outline-*" className="mt-4 streamButton"></Button>
                    </Container>
                    { twitchDrops.map((event, i) => { return <Events key={i} info={event} />}) }                        
                </Container>
            </Container>
            <Footer />
        </>
    )
}

export function Past({pastDrops=[]}) {
    let startString = StartStringDate(pastDrops)
    let endString = EndStringDate(pastDrops)
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

            <Container fluid className="ps-0 pe-0" style={{background:"url(images/wood-chopping.png)"}}>
                <Container fluid className="pt-5">
                    <Image src="images/twitchDrops.png" width="100%" style={{maxWidth:"800px"}}/>
                </Container>
                <Container fluid className="mt-5" style={{ padding:"20px", backgroundColor:"rgb(43, 36, 82, 0.75)"}}>
                    
                    <Image src="images/pastEvents.png" width="100%" style={{maxWidth:"800px"}}/>
                    {/* <CountDownDisplay timeLeft={timeLeft} />   */}
                </Container>    
                <Container className="py-3">
                    { pastDrops.map((event, i) => { return <Events key={i} info={event} />}) }                        
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
    let startString = StartStringDate(futureDrops);
    let endString = EndStringDate(futureDrops);

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
            <Container fluid className="ps-0 pe-0" style={{background:"url(images/hunting.png)"}}>
                <Container fluid className="pt-5">
                    <Image src="images/twitchDrops.png" width="100%" style={{maxWidth:"800px"}}/>
                </Container>
                <Container fluid className="mt-5" style={{ padding:"20px", backgroundColor:"rgb(43, 36, 82, 0.75)"}}>
                    
                    <Image src="images/futureEvents.png" width="100%" style={{maxWidth:"800px"}}/>
                    {/* <CountDownDisplay timeLeft={timeLeft} />   */}
                </Container>    
                <Container className="py-3">
                    { futureDrops.map((event, i) => { return <Events key={i} info={event} />}) }                        
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
            <Container fluid className="p-0 pb-5" style={{background:"url(images/camp-fire.png"}}>
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
            <Container className="py-3">
                <Container className="p-5 bg-light rounded-3">
                    <Row>
                        <Collapse in={step1}>
                            <div id="sign-in">
                                <h4><b>Step 1</b>: sign in to your Twitch account</h4>
                                <Button
                                    onClick={() => {setStep1(!step1); setStep2(!step2)}}
                                    aria-controls="sign-in"
                                    aria-expanded={step1}
                                >
                                    Sign-in
                                </Button>
                            </div>
                        </Collapse>
                    </Row>
                    <Row>
                        <Collapse in={step2}>
                            <div id="link">
                                <h4><b>Step 2</b>: Link your account</h4>
                                <Button
                                onClick={() => {setStep2(!step2); setStep3(!step3)}}
                                aria-controls="link"
                                aria-expanded={step2}
                                >
                                    Link
                                </Button>
                            </div>
                        </Collapse>
                    </Row>
                    <Row>
                        <Collapse in={step3}>
                            <div in="activate">
                                <h4><b>Step 3</b>: Activate Twitch Drops for Project Winter</h4>
                                <Button
                                onClick={() => {setStep3(!step3); setFinal(!final)}}
                                aria-controls="activate"
                                aria-expanded={step3}
                                >
                                    Activate
                                </Button>
                                </div>
                        </Collapse>
                    </Row>
                    <Row>
                        <Collapse in={final}>
                            <div in="final">
                                <h4>Congratulations, Project Winter Twitch Drops have been activated on your account!</h4>
                            </div>
                        </Collapse>
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
                        <Nav className="container-fluid w-100 d-flex justify-content-center ps-0 pe-0">
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