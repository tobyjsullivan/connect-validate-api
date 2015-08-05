var expect = require('chai').expect;
var request = require('request');

describe("/api", function() {
  var apiUrl = 'https://connect-app-api.herokuapp.com/';
  describe("/people", function () {
    describe("POST", function() {
      it("should create a new person object", function(done) {
        request.post(apiUrl+'people', function (error, response, body) {
          expect(error).to.not.exist;
          expect(response).to.exist;
          expect(response.statusCode).to.equal(200);
          expect(body).to.exist;
          var personObj = JSON.parse(body);
          expect(personObj).to.exist;
          expect(personObj).to.have.a.property("personId");
          expect(personObj.personId).to.match(/[a-zA-Z0-9\-]+/);
          expect(personObj).to.have.a.property("name");
          expect(personObj.name).to.match(/[a-zA-Z0-9]+/);
          done();
        });
      });
    });
  });
});
