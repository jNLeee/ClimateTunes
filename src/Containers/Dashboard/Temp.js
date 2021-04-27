import React from "react";
import './Temp.css';

const Temp = (props) => {
    return (
        <div className="container">
            {props.temp ? (
                    <h2 className="temperature">{props.temp}°F</h2>
                ): null
            }
            <div className="minmax">
                {minmaxTemp(props.temp_min, props.temp_max)}
            </div>
            <div className="vision">
                <h3>{vision(props.visibility)} </h3>
            </div>
            <div className="humid">
                <h3>{humid(props.humidity)} </h3>
            </div>
            <div className="wind_speed">
                <h3>{wind_speed(props.speed)} </h3>
            </div>
        </div>
    );
} 

function minmaxTemp(min,max) {
    if(min && max) {
        return (
            <h4>
                <span className="px-4">Lows: {min}°F </span>
                <span className="px-4">Highs: {max}°F </span>
                <br></br>
                <br></br>
            </h4>
            
            
        )
    }
}

function vision(visibility) {
    if(visibility) {
        return (
            <p>
                <span className="px-4">Visibility: {visibility} Km </span>
            </p>
        )
    }
}

function humid(humidity) {
    if(humidity) {
        return (
            <p>
                <span className="px-4">Humidity: {humidity} % </span>
            </p>
        )
    }
}

function wind_speed(speed) {
    if(speed) {
        return (
            <p>
                <span className="px-4">Wind Speed: {speed} Km/hr</span>
            </p>
        )
    }
}


export default Temp;