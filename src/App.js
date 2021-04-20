import React, { Component } from 'react';
import Pusher from 'pusher-js';
import format from 'date-fns/format';
import './App.css';

class App extends Component {
  constructor() {
    super();
    const urlParams = new URLSearchParams(window.location.search);
    const isUserAuthorized = urlParams.has('authorized') ? true : false;

    this.state = {
      isUserAuthorized,
      musicHistory: [],
    };
  }

  render() {
    const { isUserAuthorized, musicHistory } = this.state;
    const connectSpotify = isUserAuthorized ? (
      ''
    ) : (
      <a href="http://localhost:5000/login">Connect your Spotify account</a>
    );

    const TableItem = (item, index) => (
      <tr key={item.played_at}>
        <td>{index + 1}</td>
        <td>{item.track_name}</td>
        <td>{format(item.played_at, 'D MMM YYYY, hh:mma')}</td>
      </tr>
    );

    const RecentlyPlayed = () => (
      <div className="recently-played">
        <h2>Recent Tracks</h2>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Song title</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>{musicHistory.map((e, index) => TableItem(e, index))}</tbody>
        </table>
      </div>
    );

    return (
      <div className="App">
        <header className="header">
          <h1>Spotify Listening History</h1>
          <p>View your music history in realtime with Spotify and Pusher</p>

          {connectSpotify}
          {musicHistory.length !== 0 ? <RecentlyPlayed /> : null}
        </header>
      </div>
    );
  }
}

export default App;

// import React from 'react';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   Redirect
// } from 'react-router-dom';
// import Dashboard from "./Containers/Dashboard";
// import Login from "./Containers/Login";
// import Help from "./Containers/Help";
// import './App.css';


// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Switch>
//           <Route exact path={"/"} component={Login} />
//           <Route path={"/Dashboard"} component={Dashboard} />
//           <Route path={"/Help"} component={Help} />
//         </Switch>
//       </Router>
//     </div>
//   );
// }

// export default App;