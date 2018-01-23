var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
  studentId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  position: String,
  headshot: String,
  description: String,
  resume: String,
  linkedin: String,
  __v: Number,
  twitter: String,
  facebook: String,
  personalSite1: String,
  isHired: Boolean,
  gradDate: String
});

var Student = mongoose.model('Student', studentSchema);

module.exports = Student;
