import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import AuthenticationContext from "azure-adal";
import NavBar from "./components/navbar";
import Routes from "./routes";

class App extends Component {
  state = {};

  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <div className="container-fluid">
            <NavBar />
            <br />
            <Routes />
          </div>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
