const people = require('../pages/_data/people.json'),
	fs = require('fs');


let count = {
	'Male': 0,
	'Female': 0
};

function padTo(number) {
	number = (`000${number}`).slice(-3);

	return number;
}

people.map(function (person) {
	person.photo = 'img/avatars/' + padTo(count[person.gender]) + (person.gender === 'Male' ? 'm' : 'f') + '.jpg';

	count[person.gender]++;
});

fs.writeFile('./pages/_data/people.json', JSON.stringify(people), 'utf8', function(err){
	if (err) throw err;
});
