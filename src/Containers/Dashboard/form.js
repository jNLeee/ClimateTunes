import React from 'react';
import "./form.css";

const Form = props => {
    return(
        <div className="container">
            <div>{props.error ? error():null}</div>
            <form onSubmit={props.loadweather}>
                <div className="input-row">
                    <div className="textBox">
                        <input type="text" className="form-control" name="city" autoComplete="off" placeholder="City"></input>
                    </div>
                    <div className="buttonClass">
                        <button className="button">
                                Search
                            </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

function error() {
    return (
        <div className="alert" role="alert">
            Please Enter Existing City 
        </div>
    )
}

export default Form;