var chai = require('chai');
var expect = chai.expect;
var sessionModels = require('../server/models/sessionModels');
var Session = require('../server/schemas/sessionSchema');
var User = require('../server/schemas/userSchema');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// var tUser = User.create({
//   firstName: 'testGuy',
//   lastName: 'testLast',
//   password: 'testPass',
//   email: 'test@test.com'
// })

// var tUser2 = User.create({
//   firstName: 'testGuy2',
//   lastName: 'testLast2',
//   password: 'testPass2',
//   email: 'test2@test.com'
// });

// var tUser3 = User.create({
//   firstName: 'testGuy3',
//   lastName: 'testLast3',
//   password: 'testPass3',
//   email: 'test3@test.com'
// });


// var testSession = {
//   imageUrl: 'img.url',
//   name: 'Test Session',
//   private: false,
//   invitedUsers: [
//       {
//         User: tUser._id,
//        Permission: 'readOnly'
//       },
//       {
//         User: tUser2._id,
//        Permission: 'writeOnly'
//       }
//     ]
// };
var tUser;
var tUser2;
var tUser3;
var testSession = {
  imageUrl: 'img.url',
  name: 'Test Session',
  private: false,
};
var testSessionId;

// var testSession1 = {
//   // invitedUsers: [{User: 1, Permission: 'write'}],
//   imageUrl: 'img.url',
//   name: 'Test Session1111',
//   private: false
// };

var testSession1Id;

describe('Session Models', function(){
  before(function(done){
    Session.remove({}).exec()
    .then(function(){
      done();
    });
  });
  before(function(done){
    User.remove({}).exec()
    .then(function(){
      return tUser = User.create({
        firstName: 'testGuy',
        lastName: 'testLast',
        password: 'testPass',
        email: 'test@test.com'
      })
    })
    .then(function(user){
      tUser = user;
      testSession.invitedUsers = [{ User: user._id, Permission: 'readOnly'}]
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
    it("should add a new user to the invited list as well as a session to the User's list of sessions", function(done){
      User.create({
        firstName: 'testGuy2222',
        lastName: 'testLast2222',
        password: 'testPass2222',
        email: 'test2222@test.com'
      })
      .then(function(user){
        tUser2 = user;
        return sessionModels.addUser(testSessionId, tUser2._id, 'writeOnly')
      })
      .then(function(result){
        return Session.findOne({name: 'Test Session'}).exec()
      })
      .then(function(session){
        // console.log(session.invitedUsers)
        expect(session.invitedUsers.length).to.equal(2);
        expect(session.invitedUsers[0].User.toString()).to.equal(tUser._id.toString());
        expect(session.invitedUsers[0].Permission).to.equal('readOnly');
      })
      .then(function(result){
        return User.findOne({firstName: 'testGuy'}).exec()
      })
      .then(function(user){
        // console.log(session.invitedUsers)
        expect(user.sessions.length).to.equal(1);
        expect(user.sessions[0].toString()).to.equal(testSessionId.toString());
        done();
      })
    });
  });

  describe('Remove User', function(){
    it('should remove a user from the invited list', function(done){
      User.create({
        firstName: 'testGuy3333',
        lastName: 'testLast3333',
        password: 'testPass3333',
        email: 'test3333@test.com'
      })
      .then(function(user){
        tUser3 = user;
        return sessionModels.addUser(testSessionId, tUser3._id, 'readAndWrite')
      })
      .then(function(result){
        return sessionModels.removeUser(testSessionId, tUser._id)
      })
      .then(function(result){
        return Session.findOne({name: 'Test Session'}).exec()
      })
      .then(function(session){
        expect(session.invitedUsers.length).to.equal(2);
        expect(session.invitedUsers[0].User.toString()).to.equal(tUser2._id.toString());
        expect(session.invitedUsers[0].Permission).to.equal('writeOnly');

        done();
      })
      .catch(function(err){
        console.log(err);
        done();
      });
    });
  
  });

  describe('Delete Session', function(){
    it('should delete a session from the database', function(done){
      sessionModels.deleteSession(testSessionId)
      .then(function(result){
        return Session.find({}).exec()
      })
      .then(function(sessions){
        expect(sessions.length).to.equal(0);
        // expect(sessions[0].name).to.equal('Test Session1');
        done();
        })
      .catch(function(err){
        console.log(err);
        done();
      });
    })
  })
});