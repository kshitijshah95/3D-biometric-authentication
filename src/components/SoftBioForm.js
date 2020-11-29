import React, { useState, Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

export default class SoftBioForm extends Component {
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    state = {
        redirect: false
    }
    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/capture' />
        }
    }

    displayRadioValue = (element) => { 
        var ele = document.getElementsByName(element); 
          
        for(let i = 0; i < ele.length; i++) { 
            if(ele[i].checked) 
                return ele[i].value;
        } 
    } 

    handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Collect All Data
        const genderValue = this.displayRadioValue('gender');
        const glassesValue = this.displayRadioValue('glasses');
        const hairOcclusionsValue = this.displayRadioValue('hairOcclusions');
        const ageValue = document.getElementsByName('age').value;
        const heightValue = document.getElementsByName('height').value;
        const ethnicityValue = document.getElementsByName('ethnicity').value;
        const skinColorValue = document.getElementsByName('skinColor').value;
        const eyeColorValue = document.getElementsByName('eyeColor').value;
        const hairColorValue = document.getElementsByName('hairColor').value;
        const dyedHairColorValue = document.getElementsByName('dyedHairColor').value;
        const beardValue = this.displayRadioValue('beard');
        const mustacheValue = this.displayRadioValue('mustache');

        // 3. Retrieve the Subject ID from GET /start
        let res = await axios.get('http://localhost:5000/start')

        const subjectID = res.data.subjectID;

        console.log("ID = " + subjectID);

        const data = {
            subjectID: subjectID, 
            glasses: glassesValue, 
            hairOcclusion: hairOcclusionsValue, 
            content: [{
                gender: genderValue,
                age: ageValue,
                height: heightValue,
                ethnicity: ethnicityValue,
                skinColor: skinColorValue,
                eyeColor: eyeColorValue,
                hairColor: hairColorValue,
                dyedHairColor: dyedHairColorValue,
                beard: beardValue,
                mustache: mustacheValue
            }]
        };

        // 4. Send Data to the backend through POST /start with subjectID
        await axios.post('http://localhost:5000/start', data)
        .then(function (response) {
            console.log(response);
          });

        this.setRedirect();

    }
    
    render(){
        return (
            <>
                {this.renderRedirect()}
                <h2>Soft Biometrics</h2>
                <form onSubmit={this.handleSubmit}>
                    <label><b>Glasses</b><br/>
                    <input type="radio" name="glasses" value="true"/>Yes<br/>
                    <input type="radio" name="glasses" value="false"/>No<br/>
                    </label><br/>

                    <label><b>Hair Occlusions</b><br/>
                        <input type="radio" name="hairOcclusions" value="true"/>Yes<br/>
                        <input type="radio" name="hairOcclusions" value="false"/>No<br/>
                    </label><br/>

                    {/* Gender */}
                    <label><b>Gender</b><br/>
                        <input type="radio" name="gender" value="male"/>Male<br/>
                        <input type="radio" name="gender" value="female"/>Female<br/>
                        <input type="radio" name="gender" value="other"/>Other<br/>
                    </label><br/>

                    {/* Age */}
                    <label><b>Age</b><br/>
                        <input type="number" name="age" min='18' max='80'/>
                    </label><br/>


                    {/* Height */}
                    <label><b>Height</b><br/>
                        <input type="number" name="height" min='4' max='7' step="0.1"/>
                    </label><br/>

                    {/* Ethnicity */}
                    <label><b>Ethnicity</b><br/>
                        <input type="text" name="ethnicity"/>
                    </label><br/>
                      
                    {/* Skin Color */}
                    <b><label>Skin Color</label></b><br/>
                    <input type="text" name="skinColor"/><br/>
                    
                    {/* Eye Color */}
                    <label>
                    <b>Eye Color</b><br/>
                        <input type="text" name="eyeColor"/>
                    </label><br/>

                    {/* Hair Color */}
                    <label>
                    <b>Hair Color</b><br/>
                    <input type="text" name="hairColor"/>
                    </label><br/>

                    {/* DyedHairColor Color */}
                    <label><b>Dyed Hair Color</b><br/>
                        <input type="text" name="dyedHairColor"/>
                    </label><br/>


                    {/* Beard */}
                    <label><b>Beard</b><br/>
                        <input type="radio" name="beard" value="Yes"/>Yes<br/>
                        <input type="radio" name="beard" value="No"/>No
                    </label><br/>

                    {/* Mustache */}
                    <label><b>Mustache</b><br/>
                        <input type="radio" name="mustache" value="Yes"/>Yes<br/>
                        <input type="radio" name="mustache" value="No"/>No
                    </label><br/>
                    <button type="submit">Submit</button>
                </form>
            </>
        )
    }
}