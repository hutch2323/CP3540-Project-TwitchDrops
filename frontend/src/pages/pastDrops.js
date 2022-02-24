import '../App.css';
import React from 'react';
import { Container, Row, Image} from 'react-bootstrap';
import { EventLayout } from '../dropDisplay';
import { Title, Navigation, Footer } from './template';

// this function controls the display of the Past drops events
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

            <Container fluid className="ps-0 pe-0 pastDrops">
                <Container fluid className="pt-5">
                    <Image src="images/twitchDrops.png" width="100%" style={{maxWidth:"800px"}}/>
                </Container>
                <Container fluid className="mt-5" style={{ padding:"20px", backgroundColor:"rgb(43, 36, 82, 0.75)"}}>
                    
                    <Image src="images/pastEvents.png" width="100%" style={{maxWidth:"675px"}}/>
                </Container>    
                <EventLayout drops={pastDrops} />
            </Container>
            <Footer />
        </>
    )
}