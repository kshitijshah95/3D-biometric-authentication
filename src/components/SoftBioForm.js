import React, { useState, Component } from 'react';
// import {Form, FormGroup , FormControl,AlertDismissable,Glyphicon} from 'react-bootstrap'
//    import {FieldGroup} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";

export default class SoftBioForm extends Component {
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        // 1. Collect All Data
        const data = new FormData(e.target);
        // fetch('/start', {
        //   method: 'POST',
        //   body: data,
        // });

        console.log(data);

        // 2. Validate Input

        // 3. Retrieve the Subject ID from GET /start

        // 4. Send Data to the backend through POST /start with subjectID

        // 5. Route to Capture /capture page
    }
    
    render(){
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    {/* Gender */}
                    <label><b>Gender</b><br/>
                    <input type="radio" name="gender" value="male"/>Male<br/>
                    <input type="radio" name="gender" value="female"/>Female<br/>
                    <input type="radio" name="gender" value="other"/>Other<br/>
                    </label>
                    {/* Age */}
                    <label><b>Age</b><br/>
                    <input type="number" name="age" min='18' max='80'/><br/>
                    </label>


                    {/* Height */}
                    <label><b>Height</b><br/>
                    <input type="number" min='4' max='7' step="0.02"/><br/>
                    </label>

                    {/* Ethnicity */}
                    <label><b>Ethnicity</b><br/>
                    <input type="checkbox" name="ethnicity" value="asian"/>Asian<br/>
                    <input type="checkbox" name="ethnicity" value="irish"/>Irish<br/>
                    <input type="checkbox" name="ethnicity" value="chineese"/>Chineese<br/>
                    <input type="checkbox" name="ethnicity" value="indian"/>Indian<br/>
                    </label>
                      
                    {/* Skin Color */}
                    <b><label>Skin Color</label></b><br/>
                    <input type="text" name="skin-color"/><br/>
                    
                    {/* Eye Color */}
                    <b><label>Eye Color</label></b><br/>
                    <input type="text" name="gender"/><br/>

                    {/* Hair Color */}
                    <b><label>Hair Color</label></b><br/>
                    <input type="text" name="hair-color"/><br/>


                    {/* DyedHairColor Color */}
                    <b><label>Dyed Hair Color</label></b><br/>
                    <input type="text" name="dyed-hair-color"/><br/>


                    {/* Beard */}
                    <b><label>Beard</label></b><br/>
                    <input type="radio" name="beard" value="Yes"/>Yes<br/>
                    <input type="radio" name="beard" value="No"/>No<br/>

                    {/* Mustache */}
                    <b><label>Mustache</label></b><br/>
                    <input type="radio" name="mustache" value="Yes"/>Yes<br/>
                    <input type="radio" name="mustache" value="No"/>No<br/>

                    <button type="submit">Submit</button>
                </form>
            </>
        )
    }
}