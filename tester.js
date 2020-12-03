/*
	Tester of this Api
	It will test all the important functions
	to test if they work properly
*/

//setting it up
const chai = require("chai");
const chaiHttp = require("chai-http");
var should = require("chai").should()

const baseUrl = "http://127.0.0.1:3000";
const CheckingData = {
	"firstname" : "John",
	"lastname" : "Doe",
	"id" : 0,
	"votes": 42,
	"accomplished" : "Test candidate"
};

chai.use(chaiHttp);
// testing starts here

describe("Server", function() {
	it("running", function(done) {
		chai.request(baseUrl)
		.get("/tester")
		.end(function(err, res) {
			res.should.have.status(200);
			done();
		})
	});
});
describe("Load Candidates", function() {
	it("Get all Candidates", function(done) {
		chai.request(baseUrl)
		.get("/allNobel")
		.end(function(err, res) {
			res.should.have.status(200);
			done();
		})
	});
});
