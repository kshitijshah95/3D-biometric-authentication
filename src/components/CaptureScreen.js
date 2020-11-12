import React, { Component } from 'react';
import axios from 'axios';

export default class CaptureScreens extends Component {
    handleCapture = async (e) => {
        const res = await axios.get('http://locahost:5000/capture');
        console.log(res);

    }
    render(){
        return (
            <>
                <button onClick={this.handleCapture}>Capture</button>
            </>
        )
    }
}