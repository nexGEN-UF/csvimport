var csv = require('fast-csv');
var mongoose = require('mongoose');
var Student = require('./student.model');

exports.post = function (req, res) {
	if (!req.files)
		return res.status(400).send('No files were uploaded.');

	var studentFile = req.files.file;

	var students = [];
	var studentPromises = [];
	var newStudents = 0;

	var failures = [];

	csv
	 .fromString(studentFile.data.toString(), {
		headers: true,
		ignoreEmpty: true
	 })
	 .on("data", function(data){
		students.push(data);
	 })
	 .on("end", function(){
		students.forEach((student, ind, arr) => {

			// Save each database request promise into array so we can keep track of when they all finish
			studentPromises[ind] = Student.findOneAndUpdate(
				{ _id: student._id },
				student,
				{ upsert: true, setDefaultsOnInsert: true }
			);


			// Execute the db request
			studentPromises[ind].exec(function(err, document) {
				if(err) {
					failures.push(err);
					console.log(err);
				}

				// The returned document is empty if the student did not exist in the collection
				if(isEmpty(document)) {
					newStudents++;
				}
			});

		});

		// Wait for all db requests to finish so we can return the amount of new students created
		Promise.all(studentPromises).then(function(vals) {
			res.send(`Updated ${students.length - newStudents} students and created ${newStudents} new students. <br> ${failures}`);
		});
	});
};

// Returns true if passed object is empty
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
