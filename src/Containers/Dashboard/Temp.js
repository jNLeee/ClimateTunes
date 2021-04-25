import React from "react";
import './Temp.css';

const Temp = (props) => {
    return (
        <div className="container">
            {props.temp_celsius ? (
                    <h2 className="temperature">{props.temp_celsius}°F</h2>
                ): null
            }
            <div className="minmax">
                {minmaxTemp(props.temp_min, props.temp_max)}
            </div>
            <div className="vision">
                <h2> {vision(props.visibility)} </h2>
            </div>
            <div className="humid">
                <h2> {humid(props.humidity)} </h2>
            </div>
            <div className="wind_speed">
                <h2> {wind_speed(props.speed)} </h2>
            </div>
        </div>
    );
} 

function minmaxTemp(min,max) {
    if(min && max) {
        return (
            <h3>
                <span className="px-4">Low: {min}°F </span>
                <span className="px-4">High: {max}°F </span>
            </h3>
        )
    }
}

function vision(visibility) {
    if(visibility) {
        return (
            <h3>
                <span className="px-4">Visibility: {visibility} Km </span>
            </h3>
        )
    }
}

function humid(humidity) {
    if(humidity) {
        return (
            <h3>
                <span className="px-4">Humidity: {humidity} % </span>
            </h3>
        )
    }
}

function wind_speed(speed) {
    if(speed) {
        return (
            <h3>
                <span className="px-4">Wind Speed: {speed} Km/hr</span>
            </h3>
        )
    }
}


export default Temp;