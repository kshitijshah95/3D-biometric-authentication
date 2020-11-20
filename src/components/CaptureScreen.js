import React, { Component } from 'react';
import axios from 'axios';

export default class CaptureScreens extends Component {
    handleCapture = async (e) => {
        const captureBtn = document.getElementById('captureBtn');
        captureBtn.disabled = true;
        let res = await axios.get('http://localhost:5000/capture');
        console.log(res.data);
        captureBtn.disabled = false;

    }
    render(){
        return (
            <>
                <button onClick={this.handleCapture} id="captureBtn">Capture</button>
            </>
        )
    }
}