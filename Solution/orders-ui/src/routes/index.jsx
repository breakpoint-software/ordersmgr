import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Orders from "../components/orders";
import OrderDetails from "../components/orderDetails";

class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={props => <Orders {...props} />} />
          <Route
            path="/orderDetails"
            exact
            render={props => <OrderDetails {...props} />}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
