import React from 'react';
import { Container, Navbar, Nav, Row, Col, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { TwitchDrops } from './App';

export function Current({twitchDrops=[]}) {
    return (
        <>
            <Container>
                <Navigation />
                <Container>
                    { twitchDrops.map((twitchDrop, i) => { return <TwitchDrops key={i} info={twitchDrop} />}) }
                </Container>
                <Footer />
            </Container>
        </>
    )
}

export function Navigation() {
    return (
        <Container style={{position: "absolute", top: "0px"}}>
            <Row>
                <Col>
                <Image src="logo.jpeg" className="float-start"></Image>
                Project Winter Twitch Drops
                </Col>
            </Row>
            <Row>
                <Navbar bg="primary" variant="dark" collapseOnSelect expand="sm">
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
            </Row>
        </Container>
    )
}

export function Footer() {
    return (
    <Container className="p-3 bg-light rounded-3" style={{position: "absolute", bottom: "0px"}}>
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