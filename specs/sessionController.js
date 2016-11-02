// friendController.js
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var request = require('supertest');
var sessionController = require('../server/controllers/sessionController');
var sessionModels = require('../server/models/sessionModels');
var Session = require('../server/schemas/sessionSchema');
var app = require('../server/server');

var testSession = {
  // invitedUsers: [{User: 1, Permission: 'write'}],
  imageUrl: 'img.url',
  name: 'TestSession1',
  private: false
};

var testUser = {
  userId: 10000,
  permission: 'readOnly'
}

var testUser2 = {
  userId: 500,
  permission: 'writeOnly'
}
//for now just simulating user: id and permission

describe('Session Controller', function() {
  before(function(done){
    this.timeout(4000);
    Session.remove({}).exec() //eventually also remove and add all users
    // .then(function(){
    //   var users = [new User(testUser), new User(friend), new User(loser)];
    //   return User.create(users);
    // })
    .then(function(success){
      // testId = users[0]._id
      // friendId = users[1]._id;
      // loserId = users[2]._id;
      done();
    })
  });

  describe('Add Session', function() {
    before(function(done){
      sinon.spy(sessionModels, 'addSession');
      done();
    })
    after(function(){
      sessionModels.addSession.restore();
    })
    it('should send a 201 with a success', function(done) {
      request(app)
          .post('/api/sessions/addSession')
          .send(testSession)
          .expect(201)
          .end(done);
    });
    it('should call sessionModels.addSession', function() {
      expect(sessionModels.addSession.calledOnce).to.equal(true);
    });
    it('should send a 400 with bad input', function(done) {
      request(app)
          .post('/api/sessions/addSession')
          .send({})
          .expect(400)
          .end(done);
    });
  });
  describe('Add User To session', function(){
    before(function(done){
      sinon.spy(sessionModels, 'addUser');
      done();
    })
    after(function(){
      sessionModels.addUser.restore();
    })
    it('should send a 201 with a success', function(done) {
      //Grab the id to look for it and add a user
      Session.findOne({name: testSession.name})
      .exec()
      .then(function(sesh) {
        // console.log(res)
        var id = sesh._id;
        request(app)
          .post('/api/sessions/addUser')
          .send({sessionId: id, userId: testUser.userId, permission: testUser.permission })
          .expect(201)
          .end(function(){
            Session.findOne({name: testSession.name})
            .exec()
            .then(function(sesh) {
              // console.log(res)
              var id = sesh._id;
              request(app)
                .post('/api/sessions/addUser')
                .send({sessionId: id, userId: testUser2.userId, permission: testUser2.permission })
                .expect(201)
                .end(done);
            });
          })
        })
      })
    it('should change the size of invitedUsers', function(done){
      Session.findOne({name: 'TestSession1' }).exec()
      .then(function(sesh){
        expect(sesh.invitedUsers.length).to.equal(2);
        expect(sesh.invitedUsers[0].User).to.equal(testUser.userId);
        expect(sesh.invitedUsers[0].Permission).to.equal(testUser.permission);
        done();
      })
    });
    it('should call sessionModels.addUser', function() {
      expect(sessionModels.addUser.callCount).to.equal(2);
    });
    it('should send a 400 with bad input', function(done) {
      request(app)
        .post('/api/sessions/addUser')
        .send({})
        .expect(400)
        .end(done);
    });
  });
  describe('Remove User from invitedUsers', function(){
    before(function(done){
      sinon.spy(sessionModels, 'removeUser');
      done();
    })
    after(function(){
      sessionModels.removeUser.restore();
    })
    it('should send a 201 with a success', function(done) {
      //Grab the id to look for it and add a user
      Session.findOne({name: testSession.name})
      .exec()
      .then(function(sesh) {
        var id = sesh._id;
        request(app)
          .post('/api/sessions/removeUser')
          .send({sessionId: id, userId: testUser.userId})
          .expect(201)
          .end(done);
      });
    })
    it('should have deleted the first user we inputted', function(done){
      Session.findOne({name: 'TestSession1' }).exec()
      .then(function(sesh){
        expect(sesh.invitedUsers.length).to.equal(1);
        expect(sesh.invitedUsers[0].User).to.equal(testUser2.userId);
        expect(sesh.invitedUsers[0].Permission).to.equal(testUser2.permission);
        done();
      })
    });
    it('should call sessionModels.removeUser', function() {
      expect(sessionModels.removeUser.callCount).to.equal(1);
    });
  });
  describe('Session Search', function(){
    before(function(done){
      sinon.spy(sessionModels, 'sessionSearch');
      done();
    })
    after(function(){
      sessionModels.sessionSearch.restore();
    })
    it('should send a 200 with a success and return an array with the result', function(done){
     request(app)
       .post('/api/sessions/sessionSearch')
       .send({search: testSession.name})
       .expect(200)
       .expect(function(res){
          expect(res.body.length).to.equal(1);
        })
       .end(done);
    });
    it('should return result based on the regex search', function(done){
     request(app)
       .post('/api/sessions/sessionSearch')
       .send({search: 'test'})
       .expect(200)
       .expect(function(res){
          expect(res.body.length).to.equal(1);
        })
       .end(done);
    });
    it('should return an empty array with a search for a nonexistant session', function(done){
     request(app)
       .post('/api/sessions/sessionSearch')
       .send({search: 'yooo'})
       .expect(200)
       .expect(function(res){
          expect(res.body.length).to.equal(0);
        })
       .end(done);
    });

  })
  describe('Delete a Session', function(){
    before(function(done){
      sinon.spy(sessionModels, 'deleteSession');
      done();
    })
    after(function(){
      sessionModels.deleteSession.restore();
    })
    it('should send a 204 with a success', function(done){
      Session.findOne({name: testSession.name})
      .exec()
      .then(function(sesh) {
        var id = sesh._id;
        request(app)
          .post('/api/sessions/deleteSession')
          .send({sessionId: id})
          .expect(204)
          .end(done);
      });
    });
    it('should call sessionModels.deleteSession', function() {
      expect(sessionModels.deleteSession.callCount).to.equal(1);
    });
    it('should delete the session from the database', function(done){
      Session.findOne({name: testSession.name})
      .exec()
      .then(function(sesh){
        expect(sesh).to.equal(null);
        done();
      });
    });
  });

});