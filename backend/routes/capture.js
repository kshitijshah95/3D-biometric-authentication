const router = require('express').Router();
let Subject = require('../models/subject.model');

let categories = [
    // Face
    [
        [['face'], ['lighting'], ['normal']],
        [['face'], ['lighting'], ['dimmed']],
        [['face'], ['lighting'], ['dark']],
        [['face'], ['lighting'], ['bright']],
        [['face'], ['expressions'], ['happy']],
        [['face'], ['expressions'], ['sad']],
        [['face'], ['expression'], ['disgusted']],
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
        [['face'], ['glasses'], ['expression'], ['disgusted']],
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


router.route('/').get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;