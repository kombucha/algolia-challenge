import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import Header from "../Header";
import Search from "../Search";
import Button from "../Button";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header title="Movies">
          <Button>Create new movie</Button>
        </Header>
        <main className="App__content">
          <Route path="/" component={Search} />
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
