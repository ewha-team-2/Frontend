import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';
import Home from './screens/Home';
import Schedule from './screens/Schedule';
import Login from './screens/Login';
import Map from './screens/Map';
import Review from './screens/Review';

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
                    <Route path="/reviews" element={<Review />} />
                    <Route path="/map" element={<Map />} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route
                        path="/login"
                        element={
                            this.state.isAuthenticated ? <Navigate to="/" /> : <Login login={this.login} />
                        }
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              
            </Router>
        );
    }
}

export default App;