import React from "react";
import Topbar from "./components/topbar/Topbar";
import { Router, Switch, Route } from "react-router-dom";
import history from "./history";
import PrivateRoomContainer from "./components/room/PrivateRoomContainer";
import PublicRoomContainer from "./components/room/PublicRoomContainer";
import { ToastContainer } from "react-toastify";

document.log = console.log;

function App() {
  return (
    <>
      <Topbar />
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={PrivateRoomContainer} />
          <Route path="/:room" component={PublicRoomContainer} />
        </Switch>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
