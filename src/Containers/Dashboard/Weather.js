import React from "react";
import './Weather.css';
 
const Weather = (props) => {
    return (
        <div className="container">
            <div className="cards">

                <i className={`wi ${props.weatherIcon} wi-20x`}/>
            

                <h4 className="description">{props.description}</h4>
            </div>
        </div>
    );
} 

export default Weather;