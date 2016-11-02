var chai = require('chai');
var expect = chai.expect;
var sessionModels = require('../server/models/sessionModels');
var Session = require('../server/schemas/sessionSchema');
// var mongoose = require('mongoose')

var testSession = {
  // invitedUsers: [{User: 1, Permission: 'write'}],
  imageUrl: 'img.url',
  name: 'Test Session',
  private: false
}



// mongoose.connect('mongodb://localhost/drawmie');

describe('Session Modals', function(){
  before(function(done){
    Session.remove({}).exec()
    .then(function(){
      done();
    });
  });
 
  describe('Add session', function(){
    it('should add a new session to the database', function(done){
      sessionModels.addSession(testSession)
      .then(function(sessionInstance){
        return Session.findOne({name: 'Test Session'}).exec()
      })
      .then(function(session){
        expect(session.name).to.equal('Test Session');
        done();
      })
      .catch(function(err){
        console.log(err);
        done();
      });
    });
  });

});