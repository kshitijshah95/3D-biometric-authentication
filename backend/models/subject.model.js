const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  subjectID: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

const Subject = mongoose.model('datasets', subjectSchema);

module.exports = Subject;