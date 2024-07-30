import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Home from './screens/Home';
import Calendar from './screens/Calendar';
import Schedule from './screens/Schedule';
import Login from './screens/Login';
import Map from './screens/Map';
import Review from './screens/Review';

class App extends React.Component {
  state = {
      isAuthenticated: false,
      loading: true,
  };

  async componentDidMount() {
      try {
          // /check-auth 엔드포인트에 요청을 보내 인증 상태를 확인합니다.
          const response = await axios.get('/check-auth', { withCredentials: true });
          console.log(response)

          if (response.status === 200 && response.data.message === 'Authenticated') {
              this.setState({ isAuthenticated: true, loading: false });
          } else {
              this.setState({ isAuthenticated: false, loading: false });
          }
      } catch (error) {
          this.setState({ isAuthenticated: false, loading: false });
      }
  }

  render() {
      const { isAuthenticated, loading } = this.state;

      if (loading) {
          return <div>Loading...</div>;
      }

      return (
          <Router>
              <Routes>
              <Route
                path="/"
                element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
              />
              <Route
                path="/calendar/:id"
                element={isAuthenticated ? <Calendar /> : <Navigate to="/login" />}
              />
              <Route
                path="/schedule/:id"
                element={isAuthenticated ? <Schedule /> : <Navigate to="/login" />}
              />
              <Route
                path="/map"
                element={isAuthenticated ? <Map /> : <Navigate to="/login" />}
              />
              <Route
                path="/login"
                element={isAuthenticated ? <Navigate to="/" /> : <Login login={this.login} />}
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Router>
      );
  }
}

export default App;
