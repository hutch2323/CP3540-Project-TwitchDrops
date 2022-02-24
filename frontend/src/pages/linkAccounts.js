import '../App.css';
import React, { useState, useEffect } from 'react';
import { Container, Row, Image, Button } from 'react-bootstrap';
import { Title, Navigation, Footer } from './template';
import { BsDiamondFill } from 'react-icons/bs';

export function Accounts({isLinked=false, twitchUser=null, steamUser=null, setIsLinked, setTwitchUser, setSteamUser}) {
    const [step1, setStep1] = useState(true);
    const [step2, setStep2] = useState(false);
    const [step3, setStep3] = useState(false);

    useEffect(() => {
        if (isLinked){
            setStep1(true);
            setStep2(true);
            setStep3(true);
        }
    })

    const onClickSteamButton = () =>{
        if(document.getElementById("steamButton").innerHTML == "SIGN OUT"){
            setSteamUser(null);                                            
            setStep2(false);                                            
            setStep3(false);
            document.getElementById("steamButton").innerHTML = "SIGN IN WITH STEAM"
            document.getElementById("steam").classList.remove('inactiveLink');
            document.getElementById("steam").classList.add('activeLink');
    
            if (document.getElementById("twitch").classList.contains('activeLink')){
                document.getElementById("twitch").classList.remove('activeLink');
                document.getElementById("twitch").classList.add('inactiveLink');
            }
    
            if (document.getElementById("activate").classList.contains('activeLink')){
                document.getElementById("activate").classList.remove('activeLink');
                document.getElementById("activate").classList.add('inactiveLink');
            }
        } else {
            if(twitchUser == null){
                setStep2(true);
                document.getElementById("twitch").classList.add('activeLink');
                document.getElementById("twitch").classList.remove('inactiveLink');
            } else {
                setStep3(true);
                document.getElementById("activate").classList.add('activeLink');
                document.getElementById("activate").classList.remove('inactiveLink');
            }
            document.getElementById("steam").classList.add('inactiveLink');
            document.getElementById("steam").classList.remove('activeLink');
            document.getElementById("steamButton").innerHTML = "SIGN OUT"
            setSteamUser("Steam Username");
        }
    }

    const onClickTwitchButton = () => {                          
        if(document.getElementById("twitchButton").innerHTML == "SIGN OUT"){
            setTwitchUser(null);
            document.getElementById("twitchButton").innerHTML = "SIGN IN WITH TWITCH"

            if (document.getElementById("steam").classList.contains('inactiveLink')){
                document.getElementById("twitch").classList.remove('inactiveLink');
                document.getElementById("twitch").classList.add('activeLink');
                setStep2(true);
            }

            if (document.getElementById("activate").classList.contains('activeLink')){
                document.getElementById("activate").classList.remove('activeLink');
                document.getElementById("activate").classList.add('inactiveLink');
            }   
        } else {
            setStep3(false);
            setStep2(true);
            document.getElementById("activate").classList.add('activeLink');
            document.getElementById("activate").classList.remove('inactiveLink');
            document.getElementById("twitch").classList.add('inactiveLink');
            document.getElementById("twitch").classList.remove('activeLink');
            document.getElementById("twitchButton").innerHTML = "SIGN OUT"
            setTwitchUser("Twitch Username");
        }
    }

    const onClickActivateButton = () => {
        if (document.getElementById("activateButton").innerHTML == "UNLINK ACCOUNTS"){
            document.getElementById("steam").classList.add('activeLink');
            document.getElementById("steam").classList.remove('inactiveLink');
            document.getElementById("activate").classList.add('inactiveLink');
            document.getElementById("activate").classList.remove('activeLink');
            document.getElementById("steamButton").innerHTML = "SIGN IN WITH STEAM";
            document.getElementById("twitchButton").innerHTML = "SIGN IN WITH TWITCH";
            document.getElementById("activateButton").innerHTML = "ACTIVATE DROPS";
            setSteamUser(null);
            setTwitchUser(null);
            setIsLinked(false);
            setStep3(false);
            setStep2(false);
            setStep1(true);
        } else {
            document.getElementById("activateButton").innerHTML = "UNLINK ACCOUNTS";
            document.getElementById("activate").classList.add('inactiveLink');
            setStep3(false);
            setIsLinked(true);
            window.scrollTo(0, 0);
        }
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
            <Container fluid className="ps-0 pe-0 pb-5" style={{background:"url(images/background_store.jpg)", backgroundPosition: "center", 
                    backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", backgroundSize: "cover"}}>
                <Container fluid className="pt-5">
                    {!isLinked ? 
                        <Image src="images/twitchDrops.png" width="100%" style={{maxWidth:"800px"}}/>
                    :
                        <Image src="images/twitchDropsActivated.png" width="100%" style={{maxWidth:"800px"}}/>
                    }
                </Container>
                <Container fluid className="mt-5" style={{ padding:"20px", backgroundColor:"rgb(43, 36, 82, 0.75)"}}>
                    <Image src="images/linkAccounts.png" width="100%" style={{maxWidth:"800px"}}/>
                </Container>  
                <Container className="mt-5 p-5 rounded-3" style={{backgroundColor:"rgb(0, 0, 0, 0.75)", color:"white"}}>
                    <Row className={!isLinked && steamUser==null ? "activeLink p-3" : "inactiveLink p-3"} id="steam">
                        <Container>
                            <div id="sign-in">
                                <h4 className="pb-2"><b style={{color:""}}>Step 1</b>: Sign in to your Steam account</h4>
                                <Button
                                    style={{backgroundColor:"#1B2C43", borderRadius:"6px", height:"55px", maxWidth:"250px", width:"100%", fontFamily:"Timeless-Normal", alignItems:"center"}}
                                    onClick={() => { onClickSteamButton() }}
                                    aria-controls="sign-in"
                                    aria-expanded={step1}
                                    variant="outline-*"
                                    disabled={step1==false && steamUser==null}
                                >
                                    <Container className="d-flex justify-content-center p-0 m-0" style={{alignItems:"center", alignItems:"center", color:"white"}}>
                                        <Image className="me-2" src="images/steamLogo.png" height="25px" width="25px"/>
                                        {steamUser != null ?
                                            <span id="steamButton">SIGN OUT</span>
                                        :
                                            <span id="steamButton">SIGN IN WITH STEAM</span>
                                        }
                                    </Container>
                                    
                                </Button>
                            </div>
                        </Container>
                        {steamUser != null &&
                            <Container>
                                <p className="m-auto" style={{fontSize:"24px", color:"#FFF76F"}}>{steamUser}</p>
                            </Container>
                        }
                    </Row>
                    <Row>
                        <Container className="diamondContainer p-5 d-flex justify-content-center">
                            <BsDiamondFill className="diamond ms-3 me-3" color="#FFF76F"/>
                            <BsDiamondFill className="diamond ms-3 me-3" color="#FFF76F"/>
                            <BsDiamondFill className="diamond ms-3 me-3" color="#FFF76F"/>
                            <BsDiamondFill className="diamond ms-3 me-3" color="#FFF76F"/>
                            <BsDiamondFill className="diamond ms-3 me-3" color="#FFF76F"/>
                        </Container>
                    </Row>
                    
                    <Row className="inactiveLink p-3" id="twitch">
                        <Container>
                            <div id="link">
                                <h4 className="pb-2"><b>Step 2</b>: Sign into your Twitch account</h4>
                                <Button
                                    style={{backgroundColor:"#822DFF", borderRadius:"6px", height:"55px", maxWidth:"250px", width:"100%", fontFamily:"Timeless-Normal", alignItems:"center"}}
                                    variant="outline-*"
                                    onClick={() => { onClickTwitchButton() }}
                                    aria-controls="sign-in"
                                    aria-expanded={step2}
                                    disabled={(step2==false && twitchUser==null)}
                                >
                                    <Container className="d-flex justify-content-center p-0 m-0" style={{alignItems:"center", alignItems:"center", color:"white"}}>
                                        <Image className="me-2" src="images/twitchLogo.png" height="25px" width="25px"/>
                                        {twitchUser != null ?
                                            <span id="twitchButton">SIGN OUT</span>
                                        :
                                            <span id="twitchButton">SIGN IN WITH TWITCH</span>
                                        }
                                    </Container>
                                    
                                </Button>
                            </div>
                        </Container>
                        {twitchUser != null &&
                            <Container>
                                <p className="m-auto" style={{fontSize:"24px", color:"#FFF76F"}}>{twitchUser}</p>
                            </Container>
                        }
                    </Row>
                    <Row>
                        <Container className="diamondContainer p-5 d-flex justify-content-center">
                            <BsDiamondFill className="diamond ms-3 me-3" color="#FFF76F"/>
                            <BsDiamondFill className="diamond ms-3 me-3" color="#FFF76F"/>
                            <BsDiamondFill className="diamond ms-3 me-3" color="#FFF76F"/>
                            <BsDiamondFill className="diamond ms-3 me-3" color="#FFF76F"/>
                            <BsDiamondFill className="diamond ms-3 me-3" color="#FFF76F"/>
                        </Container> 
                    </Row>
                    <Row className="inactiveLink p-3" id="activate">
                        <Container>
                            <div>
                                <h4 className="pb-2"><b>Step 3</b>: Activate Twitch Drops</h4>
                                <Button
                                    style={{borderRadius:"6px", height:"55px", maxWidth:"250px", width:"100%", fontFamily:"Timeless-Normal"}}
                                    onClick={() => { onClickActivateButton() }}
                                    aria-controls="activate"
                                    aria-expanded={step3}
                                    disabled={twitchUser == null || steamUser == null}
                                >
                                    {isLinked ?
                                        <span id="activateButton">UNLINK ACCOUNTS</span>
                                    :
                                        <span id="activateButton">ACTIVATE DROPS</span>
                                    }
                                </Button>
                            </div>
                        </Container>
                    </Row>
                </Container>
            </Container>
            <Footer />
        </>
    )
}