import React, { useState } from 'react';
import { Container, Navbar, Nav, Row, Col, Image, CardGroup, Card, Collapse, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown';
import { TwitchDrops, PastDrops, FAQ } from './App';

export function Current({twitchDrops=[], timeLeft=[]}) {
    // console.log("Current:")
    // console.log(twitchDrops)
    // console.log("Pages", timeLeft)
    return (
        <>
            <Container>
                <Row>
                    <Title />
                </Row>
                <Row>
                    <Navigation />
                </Row>
            </Container>
            <Container className="text-danger" style={{ padding:"20px"}}>
                <h3>Next Event:</h3>
                <h4>Days: {timeLeft.days}, Hours: {timeLeft.hours}, Minutes: {timeLeft.minutes}, Seconds: {timeLeft.seconds}</h4>
            </Container>  
            <Container className="py-3">
                <Container className="p-5 bg-light rounded-3">
                    <Row xs={1} md={3} className="g-4 justify-content-center">
                        { twitchDrops.map((twitchDrop, i) => { return <TwitchDrops key={i} info={twitchDrop} />}) }
                        
                    </Row>
                </Container>
            </Container>
            <Footer />
        </>
    )
}
export function Past({pastDrops=[]}) {
    // console.log("Current:")
    // console.log(pastDrops)
    return (
        <>
            <Container>
                <Row>
                    <Title />
                </Row>
                <Row>
                    <Navigation />
                </Row>
            </Container>
            <Container>
                <h2 className="pt-5">Past Drops</h2>
            </Container>
            <Container className="py-5">
                <Container className="py-5 bg-light rounded-3">
                    <Row xs={1} md={3} className="g-4 justify-content-center">
                        {pastDrops.map( (drop, i) => { return <PastDrops key={i} info={drop} />}) }
                    </Row>
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
            <Container>
                <Row>
                    <Title />
                </Row>
                <Row>
                    <Navigation />
                </Row>
            </Container>
            <Container>
                <h2 className="pt-5">FAQS</h2>
            </Container>
            <Container>
                <Container className="p-5 bg-light rounded-3">
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
            <Container>
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
        <Container className="pt-2" style={{backgroundColor: "blue" , color: "white"}}>
            <Image src="images/WinterLogoLong_White_Large.png" height={50} className="float-start" />
        </Container>
    )
}

export function Navigation() {
    return (
        <Container style={{backgroundColor: "blue" , color: "white"}}>
            <Navbar variant="dark" style={{backgroundColor: "blue" , color: "white"}} collapseOnSelect expand="sm">
                <Container>
                    <Navbar.Toggle aria-controls='response-navbar-nav' />
                    <Navbar.Collapse id='response-navbar-nav'>
                        <Nav className="container-fluid">
                            <Nav.Item>
                                <LinkContainer to="/">
                                    <Nav.Link>Current Drops</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to="/pastdrops">
                                    <Nav.Link>Past Drops</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to="/faq">
                                    <Nav.Link>FAQ</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item className="ms-auto">
                                <LinkContainer to="/linkaccounts">
                                    <Nav.Link>Link Account</Nav.Link>
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
        <Container className="p-3" style={{backgroundColor: "blue" , color: "white"}}>
            <Row>
                <Col>
                Social Media Links
                </Col>
            </Row>
            <Row>
                <Col>
                Copyright Info
                </Col>
            </Row>
        </Container>
    )
}