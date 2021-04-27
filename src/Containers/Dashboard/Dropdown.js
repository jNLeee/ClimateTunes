import React from 'react';
import './Dashboard.css';

var createReactClass = require('create-react-class');
var MySelect = createReactClass({
    getInitialState: function() {
        return {
            value: 'select'
        }
    },
    change: function(event){
        this.setState({value: event.target.value});
    },
    render: function(){
       return(
          <div>
              <select className ="dropdown-toggle" id="lang" onChange={this.change} value={this.state.value}>
                 <option value="">Choose your mood:</option>
                 <option value="happy">Happy</option>
                 <option value="sad">Sad</option>
                 <option value="angry">Angry</option>
              </select>
              <p></p>
              <p>{this.state.value}</p>
          </div>
       );
    }
});


export default MySelect;