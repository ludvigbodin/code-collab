import React from "react";
import SessionContainer from "./components/room/SessionContainer";
import Topbar from "./components/topbar/Topbar";
import { Router, Switch, Route } from "react-router-dom";
import history from "./history";
import PrivateRoomContainer from "./components/room/PrivateRoomContainer";

document.log = console.log;

function App() {
  return (
    <>
      <Topbar />
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={PrivateRoomContainer} />
          <Route path="/:room" component={SessionContainer} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
