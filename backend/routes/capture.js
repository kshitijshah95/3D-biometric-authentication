const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const subjectDataModel = require('../models/subject.model');
const child = require('child_process').execFile;
const fastcsv = require('fast-csv');


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
                if(category[3] == 'hair' && !this.hairOcclusion) continue;
                let path = category.join('/');
                var dir = `./dataset/subject${this.id}/${path}`;
                // Create Folder Structure
                fs.mkdirSync(dir, {recursive:true})
            }
        }
        fs.mkdirSync(`./dataset/subject${this.id}/soft`, {recursive:true}); 
    }


    storeSoftFile = (reqBody) => {
        let headings = 'gender,age,height,ethnicity,skincolor,eyecolor,haircolor,dyedhaircolor,beard,moustache';
        
        // Save into csv File
        // const ws = fs.createWriteStream(`./dataset/subject${this.id}/soft/soft.csv`);

        let data = headings + '\n' + reqBody.join(',');

        fs.writeFileSync(`./dataset/subject${this.id}/soft/soft.csv`, data);
        
    }

    

    captureImage = () => {
        for(let i = 0; i < categories.length; i++){
            if(i === 1 && !this.glasses) continue;
            for(let category of categories[i]){
                if(category[3] == 'hair' && !this.hairOcclusion) continue;
                
                let path = category.join('/');
                var dir = `./dataset/subject${this.id}/${path}`;
                // Create Folder Structure
                fs.mkdir(dir, {recursive:true}, (err)=>{
                    if (err) console.log(`Error creating directory: ${err}`)
                })
            }
        }
    }
}


let subject;
let currentCategory = [0,0];
let imageNumber  = 0;
let currentFileName = '';
let currentFilePath = '';

// Get previous subject's data from the Database
router.route('/start').get((req, res) => {
    currentCategory;
    imageNumber = 0;
    currentFilename = '';

    subjectDataModel.find().sort({ _id: -1 }).limit(1).exec((err, subject) => {
        if(err) res.send("Error is " + err);
        else {
            let subjectID = Number(subject[0].subjectID) + 1;
            res.send({subjectID: subjectID});
        };
    });
});

// Create New Subject, Create Folder Structure and Store in Database
router.route('/start').post(async (req, res) => {
    // Retrieve last glasses and False from the UI
    let subjectID = req.body.subjectID;
    let glasses = req.body.glasses;
    let hairOcclusion = req.body.hairOcclusion;
    let softBioContent = req.body.content;

    // Create new Subject, Create Folder Structure 
    subject = await new Subject(subjectID, glasses, hairOcclusion);
    
    // Store Subject Info in Database
    let newSubject = await new subjectDataModel({subjectID: subjectID});
    newSubject.save()
    .then(() => res.json('Subject added!'))
    .catch(err => res.sendStatus(400).json('Error: ' + err));
    
    // Store softBiometric data values in csv file in soft folder 
    subject.storeSoftFile(softBioContent);
});

function getCurrentFileName(){
    let modality = currentCategory[0];
    let category = currentCategory[1];
    
    if(imageNumber >= 5 && modality < categories.length - 1){
        // Update Category
        imageNumber = 0;
        if(category < categories[modality].length - 1){
            
            // If not HairOcclusion
            if(modality > 1 && category == 6 && !subject.hairOcclusion) category += 1;
            // Same Modality, Next Category
            currentCategory = [modality, category + 1];
        } else {

            // No Glasses
            if(modality == 0 && !subject.glasses) modality += 1;

            // Next Modality
            currentCategory = [modality + 1, 0];
        }
    }
    else if(imageNumber >= 5 && modality == categories.length - 1){
        return ["Completed", "Completed"];
    }
    
    imageNumber += 1;
    currentFileName = `subject${subject.id}_${categories[currentCategory[0]][currentCategory[1]].join('_')}_${imageNumber}`;

    currentFilePath = `C://Users/Kshitij/AppData/Roaming/Slightech/MYNTEYED/SDK/1.8.0/projects/3d-biometric-authentication/backend/dataset/subject${subject.id}/${categories[currentCategory[0]][currentCategory[1]].join('/')}/`;
    
    return [currentFilePath, currentFileName];       
}

function saveToJSON(filePath, fileName){
    let paths = JSON.stringify({
        filePath: filePath,
        fileName: fileName
    });
    
    fs.writeFileSync('./mynteyed_demo/mynteyed_demo/image-data.json', paths, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });

}

router.route('/capture').get(async (req, res) => {
    let [filePath, fileName] = getCurrentFileName();
    // let filePath = getCurrentFilePath();
    
    if(filePath === "Completed"){
        res.send("Completed");
    }
    // Store FileName in JSON
    saveToJSON(filePath, fileName)

    // Execute exe
    await child('C:/Users/Kshitij/AppData/Roaming/Slightech/MYNTEYED/SDK/1.8.0/projects/3d-biometric-authentication/backend/mynteyed_demo/x64/Release/mynteyed_demo.exe', function(err, data) {
        console.log(err)
        console.log(data.toString());
        res.send({fileName});
        });
});


module.exports = router;