import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Row, Col, Image, Collapse, Button, Carousel } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FAQ, Events, } from './../App';
import { BsDiamondFill } from 'react-icons/bs';

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