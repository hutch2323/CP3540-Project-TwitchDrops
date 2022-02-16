import React from 'react';
import { Container, Navbar, Nav, Row, Col, Image, CardGroup, Card } from 'react-bootstrap';
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
                    {/*}   { faqs.map((faq, i) => { return <FAQ key={i} info={faq} />}) } */}
                    {faqs.map( (faq, i) => { return <FAQ key={i} info={faq} />}) }
                </Container>
            </Container>
            <Footer />
        </>
    )
}

export function Title() {
    return (
        <Container className="pt-2" style={{backgroundColor: "blue" , color: "white"}}>
            <Image src="WinterLogoLong_White_large.png" height={50} className="float-start" />
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