var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
  _id: {
    type: Number,
    required: true
    // unique: true
  },
  name: {
    type: String,
    required: true
  },
  major: String,
  headshot: String,
  personal_statement: String,
  head_shot: String,
  pillar:{
    semester_joined: String,
    semester_left: String,
    title: String
  },
  positions: [String],
  emails: [String],
  phone: String,
  profile_links:{
    linkedin_url: String,
    twitter: String,
    resume_link: String,
    github_link: String,
    personal_website: String,
    facebook: String
  },
  isAlumni: Boolean,
  isHired: Boolean,
  isGraduating: Boolean,
  current_employment: {
    employer: String,
    job_title: String
  },
  isPlaced: Boolean,
  PlacedAt: String,
  skills: [String],
  project_assignments: [String]
});

var Student = mongoose.model('Student', studentSchema);

module.exports = Student;
