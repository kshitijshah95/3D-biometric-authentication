import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class WelcomeScreen extends Component {
    render(){
        return (
            <>
                <h1>Welcome to the 3D Biometric Authentication Project</h1>
                <h3>Thank you for your participation</h3>
                <Link to="/start">Start</Link>
            </>
        )
    }
}