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
};

var testSessionId;

var testSession1 = {
  // invitedUsers: [{User: 1, Permission: 'write'}],
  imageUrl: 'img.url',
  name: 'Test Session1',
  private: false
};

var testSession1Id;




// mongoose.connect('mongodb://localhost/drawmie');

describe('Session Models', function(){
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
        testSessionId = session._id;
        expect(session.name).to.equal('Test Session');
        done();
      })
      .catch(function(err){
        console.log(err);
        done();
      });
    });
  });

  describe('Session search', function(){
    it('should return sessions when searched for', function(done){
      sessionModels.sessionSearch('Test')
      .then(function(sessions){
        expect(sessions[0].name).to.equal('Test Session');
        done();
      });
    });
    it('should return an empty array if no such pattern matches', function(done){
      sessionModels.sessionSearch('Hello')
      .then(function(sessions){
        expect(sessions.length).to.equal(0);
        done();
      });
    });
  });

  describe('Add User', function(){
    it('should add a new user to the invited list', function(done){
      // console.log('---------', testSession._id)
      sessionModels.addUser(testSessionId, 9, 'readOnly')
      .then(function(result){
        return Session.findOne({name: 'Test Session'}).exec()
      })
      .then(function(session){
        // console.log(session.invitedUsers)
        expect(session.invitedUsers.length).to.equal(1);
        expect(session.invitedUsers[0].User).to.equal(9);
        expect(session.invitedUsers[0].Permission).to.equal('readOnly');
        done();
      })
      .catch(function(err){
        console.log(err);
        done();
      });
    });
    it('should add a new user to the invited list', function(done){
      // console.log('---------', testSession._id)
      sessionModels.addUser(testSessionId, 40, 'writeOnly')
      .then(function(result){
        return Session.findOne({name: 'Test Session'}).exec()
      })
      .then(function(session){
        // console.log(session.invitedUsers)
        expect(session.invitedUsers.length).to.equal(2);
        expect(session.invitedUsers[1].User).to.equal(40);
        expect(session.invitedUsers[1].Permission).to.equal('writeOnly');
        done();
      })
      .catch(function(err){
        console.log(err);
        done();
      });
    });
  });

  describe('Remove User', function(){
    it('should remove a user from the invited list', function(done){
      sessionModels.addUser(testSessionId, 100, 'writeOnly')
      .then(function(result){
        sessionModels.removeUser(testSessionId, 9)
        .then(function(result){
          return Session.findOne({name: 'Test Session'}).exec()
        })
        .then(function(session){
          expect(session.invitedUsers.length).to.equal(2);
          expect(session.invitedUsers[0].User).to.equal(40);
          expect(session.invitedUsers[0].Permission).to.equal('writeOnly');

          done();
        })
      })
      .catch(function(err){
        console.log(err);
        done();
      });
    });

  });

  describe('Delete Session', function(){
    it('should delete a session from the database', function(done){
      sessionModels.addSession(testSession1)
      .then(function(result){
        sessionModels.deleteSession(testSessionId)
        .then(function(result){
          return Session.find({}).exec()
        })
        .then(function(sessions){
          expect(sessions.length).to.equal(1);
          expect(sessions[0].name).to.equal('Test Session1');
          done();
          })
        })
        .catch(function(err){
          console.log(err);
          done();
        });
      })
    });
});