import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import Header from "../common/Header";
import Search from "../Search";
import MovieCreation from "../MovieCreation";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header title="Movies" />
        <main className="App__content">
          <Switch>
            <Route path="/create" component={MovieCreation} />
            <Route path="/" exact component={Search} />
          </Switch>
        </main>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
      </div>
    );
  }
}

export default App;
