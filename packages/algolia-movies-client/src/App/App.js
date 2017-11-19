import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Switch, Route, withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import Header from "../Header";
import Button from "../Button";
import Search from "../Search";
import MovieCreation from "../MovieCreation";

import "./App.css";

class App extends PureComponent {
  _handleCreateMovie = () => {
    this.props.history.push("/create");
  };
  render() {
    console.log(this.props);
    return (
      <div className="App">
        <Header title="Movies">
          <Button onClick={this._handleCreateMovie}>Create new movie</Button>
        </Header>
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

App.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(App);
