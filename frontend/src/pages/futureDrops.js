import '../App.css';
import React from 'react';
import { Container, Row, Image } from 'react-bootstrap';
import { EventLayout } from '../dropDisplay';
import { Title, Navigation, Footer } from './template';

// function used to display the future events page
export function Future({futureDrops=[]}) {
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
            <Container fluid className="ps-0 pe-0 futureDrops">
                <Container fluid className="pt-5">
                    <Image src="images/twitchDrops.png" width="100%" style={{maxWidth:"800px"}}/>
                </Container>
                <Container fluid className="mt-5" style={{ padding:"20px", backgroundColor:"rgb(43, 36, 82, 0.75)"}}> 
                    <Image src="images/futureEvents.png" width="100%" style={{maxWidth:"800px"}}/>
                </Container>   
                <EventLayout drops={futureDrops} />
            </Container>
            <Footer />
        </>
    )
}