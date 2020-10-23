const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
}, {
  timestamps: true,
});

const Subjects = mongoose.model('Subject', subjectSchema);

module.exports = Subject;