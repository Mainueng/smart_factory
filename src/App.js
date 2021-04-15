import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./component/login";
import Summary_outdoor from "./component/summary_outdoor";
import Summary_indoor from "./component/summary_indoor";
import Production_indoor_line_1 from "./component/production_indoor_line_1";
import Production_indoor_line_2 from "./component/production_indoor_line_2";
import Production_outdoor_line_1 from "./component/production_outdoor_line_1";
import Production_outdoor_line_2 from "./component/production_outdoor_line_2";
import User_setting from "./component/user_setting";
import Master_data from "./component/master_data";

import "./App.css";

class App extends Component {
  render() {
    const App = () => (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/summary_outdoor" component={Summary_outdoor} />
        <Route path="/summary_indoor" component={Summary_indoor} />
        <Route
          path="/production_indoor_line_1"
          component={Production_indoor_line_1}
        />
        <Route
          path="/production_indoor_line_2"
          component={Production_indoor_line_2}
        />
        <Route
          path="/production_outdoor_line_1"
          component={Production_outdoor_line_1}
        />
        <Route
          path="/production_outdoor_line_2"
          component={Production_outdoor_line_2}
        />
        <Route path="/user_setting" component={User_setting} />
        <Route path="/master_data" component={Master_data} />
      </Switch>
    );

    return (
      <Switch>
        <App />
      </Switch>
    );
  }
}

export default App;
