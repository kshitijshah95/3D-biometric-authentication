const router = require('express').Router();
const fs = require('fs');
const { resolve } = require('path');
const { callbackify } = require('util');
const subjectDataModel = require('../models/subject.model');

const categories = [
    [
        // Face
        [['face'], ['lighting'], ['normal']],
        [['face'], ['lighting'], ['dimmed']],
        [['face'], ['lighting'], ['dark']],
        [['face'], ['lighting'], ['bright']],
        [['face'], ['expressions'], ['happy']],
        [['face'], ['expressions'], ['sad']],
        [['face'], ['expressions'], ['disgusted']],
        [['face'], ['expressions'], ['angry']],
        [['face'], ['expressions'], ['scared']],
        [['face'], ['camera_angle'], ['slightly_left']],
        [['face'], ['camera_angle'], ['very_left']],
        [['face'], ['camera_angle'], ['slighlty_right']],
        [['face'], ['camera_angle'], ['very_right']],
        [['face'], ['camera_angle'], ['center']],
    ], 
    [   
        // Glasses
        [['face'], ['glasses'], ['expressions'], ['happy']],
        [['face'], ['glasses'], ['expressions'], ['sad']],
        [['face'], ['glasses'], ['expressions'], ['disgusted']],
        [['face'], ['glasses'], ['expressions'], ['angry']],
        [['face'], ['glasses'], ['expressions'], ['scared']],
        [['face'], ['glasses'], ['camera_angle'], ['slightly_left']],
        [['face'], ['glasses'], ['camera_angle'], ['very_left']],
        [['face'], ['glasses'], ['camera_angle'], ['slighlty_right']],
        [['face'], ['glasses'], ['camera_angle'], ['very_right']],
        [['face'], ['glasses'], ['camera_angle'], ['center']],
    ],
    // Ears 
    [
        [['ear'], ['left'], ['lighting'], ['normal']],
        [['ear'], ['left'], ['lighting'], ['dimmed']],
        [['ear'], ['left'], ['lighting'], ['dark']],
        [['ear'], ['left'], ['lighting'], ['bright']],
        [['ear'], ['left'], ['occlusions'], ['neutral']],
        [['ear'], ['left'], ['occlusions'], ['earrings']],
        [['ear'], ['left'], ['occlusions'], ['earbuds']],
        // Only if hair is sufficiently long
        [['ear'], ['left'], ['occlusions'], ['hair']],
        [['ear'], ['left'], ['camera_angle'], ['slightly_left']],
        [['ear'], ['left'], ['camera_angle'], ['very_left']],
        [['ear'], ['left'], ['camera_angle'], ['slighlty_right']],
        [['ear'], ['left'], ['camera_angle'], ['very_right']],
        [['ear'], ['left'], ['camera_angle'], ['center']],
    ],
    [
        [['ear'], ['right'], ['lighting'], ['normal']],
        [['ear'], ['right'], ['lighting'], ['dimmed']],
        [['ear'], ['right'], ['lighting'], ['dark']],
        [['ear'], ['right'], ['lighting'], ['bright']],
        [['ear'], ['right'], ['occlusions'], ['neutral']],
        [['ear'], ['right'], ['occlusions'], ['earrings']],
        [['ear'], ['right'], ['occlusions'], ['earbuds']],
        // Only if hair is sufficiently long
        [['ear'], ['right'], ['occlusions'], ['hair']],
        [['ear'], ['right'], ['camera_angle'], ['slightly_left']],
        [['ear'], ['right'], ['camera_angle'], ['very_left']],
        [['ear'], ['right'], ['camera_angle'], ['slighlty_right']],
        [['ear'], ['right'], ['camera_angle'], ['very_right']],
        [['ear'], ['right'], ['camera_angle'], ['center']],
    ]
];

class Subject{
    constructor(subjectID, glasses = false, hairOcclusion = false){
        this.id = subjectID;
        this.glasses = glasses;
        this.hairOcclusion = hairOcclusion;
        this.createFolderStructure();
    }

    createFolderStructure = () => {
        for(let i = 0; i < categories.length; i++){
            if(i === 1 && !this.glasses) continue;
            for(let category of categories[i]){
                console.log(category[3] + " and hair is " + this.hairOcclusion);
                if(category[3] == 'hair' && !this.hairOcclusion) {
                    console.log("Ignoring");
                    continue;
                }
                let path = category.join('/');
                var dir = `./dataset/subject-${this.id}/${path}`;
                // Create Folder Structure
                fs.mkdir(dir, {recursive:true}, (err)=>{
                    if (err) console.log(`Error creating directory: ${err}`)
                  })
            }
        }
    }
}

// Get previous subject's data from the Database
router.route('/start').get((req, res) => {
    subjectDataModel.find().sort({ _id: -1 }).limit(1).exec((err, subject) => {
        if(err) res.send("Error is " + err);
        else {
            let subjectID = Number(subject[0].subjectID) + 1;
            res.send("ID is " + subjectID);
        };
    });
});


// Create New Subject, Create Folder Structure and Store in Database
router.route('/start').post((req, res) => {
    // Retrieve last glasses and False from the UI
    let subjectID = req.body.id;
    let glasses = req.body.glasses;
    let hairOcclusion = req.body.hairOcclusion;
    console.log("Glasses = " + glasses);
    console.log("hair = " + hairOcclusion);

    // Create new Subject, Create Folder Structure 
    let subject = new Subject(subjectID, glasses, hairOcclusion);

    // Store Subject Info in Database
    let newSubject = new subjectDataModel({subjectID: subjectID});
    newSubject.save()
    .then(() => res.json('Subject added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;