import React from "react";

const City = (props) => {
    return (
        <div className="container">
            <h1 className="city">{props.city}</h1>
        </div>
    );
} 

export default City;