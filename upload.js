var csv = require('fast-csv');
var mongoose = require('mongoose');
var Student = require('./student.model');

exports.post = function (req, res) {
	if (!req.files)
		return res.status(400).send('No files were uploaded.');

	var studentFile = req.files.file;

	var students = [];

	csv
	 .fromString(studentFile.data.toString(), {
		 headers: true,
		 ignoreEmpty: true
	 })
	 .on("data", function(data){
		 data['_id'] = new mongoose.Types.ObjectId();

		 students.push(data);
	 })
	 .on("end", function(){
		 Student.create(students, function(err, documents) {
			// if (err) throw err;
			if (err) {
				res.send('error uploading csv file');
				return;
			} else {
				res.send(students.length + ' students have been successfully uploaded.');
			}
		 });
	 });
};
