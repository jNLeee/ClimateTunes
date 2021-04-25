import React from 'react';
import "./Search.css";

const Search = props => {
    return(
        <div className="containerSearch">
            <div>{props.error ? error():null}</div>
            <form onSubmit={props.searchsong}>
                <div className="input-row">
                    <div className="textBox">
                        <input type="text" className="form-control" name="song" autoComplete="off" placeholder="Song Name"></input>
                        <input type="text" className="form-control" name="artist" autoComplete="off" placeholder="Artist Name"></input>
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
            Please Enter a Song Name
        </div>
    )
}

export default Search;