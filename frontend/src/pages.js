import React from "react";
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import './App.css';
import {Link, useLocation} from "react-router-dom"
import { render } from "@testing-library/react";



export function Home({twitchDrops, setTwitchDrops}) {
    console.log(twitchDrops)
    return (
        <div className="App">
        
            <nav>
                <Link to="/">Home</Link>
                <Link to="faqs">FAQS</Link>
            </nav>
          <h1>Twitch Drops</h1>
          
          {/*{ twitchDrops.map((twitchDrop, i) => { return <TwitchDrops key={i} info={twitchDrop}></TwitchDrops>}) }*/}
        
      </div>
    );
}


function TwitchDrops(props) {
    console.log(props);
    return (
      <>
        <div style={{display: "inline-block", margin: "2em"}}>
          <h2 className="mt-5">{props.info.streamer_name}</h2>
          <img rounded="true" src={props.info.item_icon}></img>
          <h3 className="fs-4 text-start">{props.info.item_name}</h3>
         
        </div>
      </>
    )
  }

  export function Faqs({twitchDrops, setTwitchDrops}) {
    console.log(twitchDrops)

    return (
        <div className="App">
            <nav>
                <Link to="/">Home</Link>
                <Link to="faqs">FAQS</Link>

            </nav>
            <h1>FAQS</h1> 
        </div>
    );
}

export function PageNotFound() {
    let location = useLocation();
    return (
        <div className="App">
            <nav>
                <Link to="/">View All Reviews</Link>
            </nav>
            <nav>
                <Link to="addReview">Add a Review</Link>
            </nav>
            <h1>Error, this page does not exist!</h1>
            <h2>{location.pathname}</h2>
        </div>
    );
}