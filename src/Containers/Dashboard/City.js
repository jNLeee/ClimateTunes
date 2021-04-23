import React from "react";
import './City.css';

const City = (props) => {
    return (
        <div className="container">
            <h1 className="city">{props.city}</h1>
        </div>
    );
} 

export default City;