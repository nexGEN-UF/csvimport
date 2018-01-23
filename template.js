var json2csv = require('json2csv');
var Student = require('./student.model.js');

exports.get = function(req, res) {

	var fields = Object.keys(Student.schema.obj);

	var csv = json2csv({ data: '', fields: fields });

	res.set("Content-Disposition", "attachment;filename=students.csv");
	res.set("Content-Type", "application/octet-stream");

	res.send(csv);

};
