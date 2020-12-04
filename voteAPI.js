/*
	Nobel voting API
	authors: Viktorx64, OscaHar, and M4xen
*/
console.log("Program starting");
const express = require('express');
const router = express()
const bodyParser = require('body-parser');
var fs = require('fs');

var date = new Date();

const lastMonthTooVote = 11;
const lastDayTooVote = 10;
const lastHourTooVote = 10;
const lastMinTooVote = 10;

const dataPathVotes = "./data/votes.json";
router.get('/tester', function(req, res, next) {
	res.send("It Works");
	next();
});
router.use(bodyParser.urlencoded({ extended: true }));
router.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.header('Access-Control-Allow-Credentials', 'true');
	next();
});
//get All Votes
router.get('/vote', function(req,res, next) {
	fs.readFile(dataPathVotes, (err, data) => {
		if (err) {
			throw err;
		}
		//var nobleList = JSON.parse(data);
		res.send(JSON.parse(data));
		next();
	});
});
//get poll winner
router.get('/vote', function(req,res, next) {
	fs.readFile(dataPathVotes, (err, data) => {
		if (err) {
			throw err;
		}
		var nobleList = JSON.parse(data);
		/*res.send(JSON.parse(data));
		next();*/

		var date = new Date();

		const lastMonthTooVote = 11;
		const lastDayTooVote = 10;
		const lastHourTooVote = 10;
		const lastMinTooVote = 10;

		if(date.getMonth() + 1 >= lastMonthTooVote && date.getDate() >= lastDayTooVote && date.getHours() >= lastHourTooVote && date.getMinutes() > lastMinTooVote) {
			console.log("Voting time is over; winner is:");
			const sort_by = (field, reverse, primer) => {
				const key = primer ?
				  function(x) {
					return primer(x[field])
				  } :
				  function(x) {
					return x[field]
				  };
			  
				reverse = !reverse ? 1 : -1;
			  
				return function(a, b) {
				  return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
				}
			  }
			  nobleList.sort(sort_by('votes', true, parseInt));
			  console.log(nobleList[0].name + " " + nobleList[0].votes);
			  nobleList.sort(sort_by('id', false, parseInt));
		}
	});
});
//save Votes
router.get('/vote/:id', function(req,res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	var nobleList;
	var id = parseInt(req.params.id);
	fs.readFile(dataPathVotes, (err, data) => {
		if (err) {
			throw err;
		}

		var date = new Date();

		const lastMonthTooVote = 11;
		const lastDayTooVote = 10;
		const lastHourTooVote = 10;
		const lastMinTooVote = 10;

		if(date.getMonth() + 1 >= lastMonthTooVote && date.getDate() >= lastDayTooVote && date.getHours() >= lastHourTooVote && date.getMinutes() > lastMinTooVote) {
			console.log("Voteing time have expired");
		}else{
			canVote();
		}
		function canVote(){
			nobleList = JSON.parse(data);
			nobleList[id].votes++;
			
			fs.writeFile(dataPathVotes, JSON.stringify(nobleList), (err) => {
				if (err) {
					throw err;
				}
				console.log("somebody voted!");
			});
			
			res.send(nobleList);
			next();
		}
	});
});
/*
	may remove this when using it as an api
*/ 
router.listen(process.env.PORT || 3000, function(){
	console.log("Server Listening on port 3000");
});
//export it
module.exports = router;