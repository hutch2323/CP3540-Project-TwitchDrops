import React from 'react';
import { BsClock } from "react-icons/bs"; 
import { Container, Navbar, Nav, Row, Col, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export function Current({twitchDrops=[]}) {
    console.log("Current:")
    console.log(twitchDrops)
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
            <Container className="py-5">
                <Container className="p-5 bg-light rounded-3">
                    <Row md="auto">
                    { twitchDrops.map((twitchDrop) => (
                        <Container className="text-light border-primary rounded-3 p-3" style={{backgroundColor: "blue"}}>
                        <h2 className="mt-5">{twitchDrop.streamer_name}</h2>
                        <Image src={twitchDrop.item_icon} thumbnail="true" />
                        <h3 className="fs-4">{twitchDrop.item_name}</h3>
                        <p><BsClock style={{paddingRight: "5px"}}/>{twitchDrop.unlock_condition}</p>
                      </Container>
                    ))}
                    </Row>
                </Container>
            </Container>
            <Footer />
        </>
    )
}

export function Past({TwitchDrops=[]}) {
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
            <Container className="py-5">
                <Container className="py-5 bg-light rounded-3">
                    {/* Use <PastDrops /> when setting up map */}
                    Past drops test.
                </Container>
            </Container>
            <Footer />
        </>
    )
}

export function FAQS({faqs=[]}) {
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
            <Container className="py-5">
                <Container className="p-5 bg-light rounded-3">
                { faqs.map((faq) => (
                    <Container>
                        <h4>{faq.question}</h4>
                            <p>{faq.answer}</p>
                    </Container>
                ))}
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