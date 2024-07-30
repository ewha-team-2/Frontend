import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./screens/Home";
import Schedule from "./screens/Schedule";
import Calendar from "./screens/Calendar";
import Login from "./screens/Login";

class App extends React.Component {
  state = {
    isAuthenticated: false,
  };

  login = () => {
    this.setState({ isAuthenticated: true });
  };

  logout = () => {
    this.setState({ isAuthenticated: false });
  };

  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar/:id" element={<Calendar />} />
          <Route path="/schedule/:id" element={<Schedule />} />
          <Route
            path="/login"
            element={
              this.state.isAuthenticated ? (
                <Navigate to="/" />
              ) : (
                <Login login={this.login} />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
