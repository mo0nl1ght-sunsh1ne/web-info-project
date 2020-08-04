var sinon = require("sinon");
var expect = require("chai").expect;
var assert = require("chai").assert;
var should = require("chai").should();
var controller = require("../../controllers/loginController.js");
const user = require("../../models/user.js");

describe("controller", function() {
  const mockResponse = fake => {
    return {
      send: fake
    };
  };
  const mockRequest = (session, body) => ({
    session,
    body
  });
  describe("profile", function() {
    it("should have length of 1", function() {});
    it("should have id, username, email, and displayPic", function() {});
    it("should return a user info", function() {});
  });
});

const fake = sinon.fake();
const req = mockRequest({}, {});
const res = mockResponse(fake);
controller.profile();
const result = fake.lastArg;
expect(result).to.have.lengthOf(1);
result.should.have.lengthOf(1);
assert.equal(result.length, 1);
