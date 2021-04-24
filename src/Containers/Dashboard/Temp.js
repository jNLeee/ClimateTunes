import React from "react";
import './Temp.css';

const Temp = (props) => {
    return (
        <div className="container">
            {props.temp_celsius ? (
                    <h2 className="temperature">{props.temp_celsius}°F
                    </h2>
                ): null
            }
            <div className="minmax">
                {minmaxTemp(props.temp_min, props.temp_max)}
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

export default Temp;