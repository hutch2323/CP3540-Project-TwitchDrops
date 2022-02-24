import '../App.css';
import React from 'react';
import { BsDiamondFill } from "react-icons/bs"; 
import { Container, Row, Image, Accordion } from 'react-bootstrap';
import { Title, Navigation, Footer } from './template';

// function used to display the FAQ page
export function FAQS({faqs=[]}) {
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
            <Container fluid className="p-0 pb-5 faq">
            <Container fluid className="pt-5">
                    <Image src="images/twitchDrops.png" width="100%" style={{maxWidth:"800px"}}/>
                </Container>
                <Container fluid className="mt-5" style={{ padding:"20px", backgroundColor:"rgb(0, 0, 0, 0.65)"}}>
                    <Image className="pt-3" src="images/faqs.png" width="100%" style={{maxWidth:"800px"}}/>
                </Container>
                <Container className="pt-3 rounded-3" >
                    <Container className="py-3 pb-5">
                        {/* Logic to determine if there are FAQs to display */}
                        {faqs.length > 0 ? 
                            <Accordion>
                                {faqs.map( (faq, i) => { return (
                                    <Accordion.Item className="rounded-3 question" eventKey={i} key={i}>
                                        <FAQ key={i} info={faq} />
                                    </Accordion.Item>
                                )})}
                            </Accordion>
                        :
                            <Container className="p-5 mb-2 rounded-3">
                                <Row className="rounded-3 pt-3 pb-3 g-4 m-auto mb-3 justify-content-center" style={{backgroundColor:"rgba(0, 0, 0, 0.5)", color:"white", fontSize:"20px", fontFamily:"Timeless-Normal"}}>
                                <p className="m-auto" style={{fontSize:"35px", color:"#FFF76F"}}>No FAQs Available</p>
                                <p className="m-auto"><BsDiamondFill color="#FFF76F"/> Check again soon! <BsDiamondFill color="#FFF76F"/></p>
                            </Row> 
                            </Container>
                        }                 
                    </Container>
                </Container>
            </Container>
            <Footer />
        </>
    )
}

// function used to display each FAQ in an accordion format
export function FAQ(props){
    return(
        <>
            <Accordion.Header className="p-3"><h5 className="m-0 w-100 text-center" style={{color:"#FFF76F"}}>{props.info.question}</h5></Accordion.Header>
            <Accordion.Body className="pt-0">
                <Container className="pb-4">
                    <BsDiamondFill color="#2B2452"/>
                    <BsDiamondFill color="#2B2452"/>
                    <BsDiamondFill color="#2B2452"/>
                    <BsDiamondFill color="#2B2452"/>
                    <BsDiamondFill color="#2B2452"/>
                </Container>
                <p style={{overflowWrap:"break-word", color:"white"}}>{props.info.answer}</p>
            </Accordion.Body>
        </>
    )
  }