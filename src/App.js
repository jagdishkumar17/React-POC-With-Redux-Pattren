import React, { Component } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
/** Layouts **/
import Wrapper from "./components/wrapper/Wrapper";

class App extends Component  {
  render() {
    return (
      <div>
        <HashRouter>
          <div>
            <Switch>
               <Route
                render={props => (
                  <Wrapper>
                    <Component {...props} />
                  </Wrapper>
                )}
              />
            </Switch>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
