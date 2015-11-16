Meteor.subscribe("games");

Template.body.helpers({
  games: function () {
    return Games.find({}, {sort: {createdAt: -1}});
  },
  openGames: function () {
    return Games.find({$or: [{player1Move: ''}, {player2Move: ''}]}, {sort: {createdAt: -1}});
  },
  completedGames: function () {
    return Games.find({$and: [{player1Move: {$exists: true}}, {player2Move: {$exists: true}}]}, {sort: {createdAt: -1}});
  },
  gameCount: function () {
    return Games.find({}).count();
  },
  openGameCount: function () {
    return Games.find({$or: [{player1Move: ''}, {player2Move: ''}]}).count();
  },
  completedGameCount: function () {
    return Games.find({$and: [{player1Move: {$exists: true}}, {player2Move: {$exists: true}}]}).count();
  },
  currentGameID: function () {
    return Session.get('currentGameID');
  },
  currentGame: function () {
    var currentGameID = Session.get('currentGameID');
    return Games.find({"_id": currentGameID});
  },
  player1Move: function () {
    var currentGameID = Session.get('currentGameID');
    return Games.findOne({"_id": currentGameID}).player1Move;
  },
  player2Move: function () {
    var currentGameID = Session.get('currentGameID');
    return Games.findOne({"_id": currentGameID}).player2Move;
  },
  winner: function () {
    var currentGameID = Session.get('currentGameID');
    var currentGame = Games.findOne({"_id": currentGameID});
    if (currentGame.player1Move && currentGame.player2Move) {
      if (currentGame.player1Move === currentGame.player2Move) {
        return 'None';
      } else if (currentGame.player1Move === 'rock') {
        if (currentGame.player2Move === 'paper')
          return 'Player 2'
        else
          return 'Player 1'
      } else if (currentGame.player1Move === 'paper') {
        if (currentGame.player2Move === 'scissors')
          return 'Player 2'
        else
          return 'Player 1'
      } else {
        if (currentGame.player2Move === 'rock')
          return 'Player 2'
        else
          return 'Player 1'
      }
    }
  },
  isCompleted: function () {
    var currentGameID = Session.get('currentGameID');
    var currentGame = Games.findOne({"_id": currentGameID});
    var completed = currentGame.player1Move && currentGame.player2Move;
    return completed;
  }
});

Template.body.events({
  'click .createGameButton': function () {
    Meteor.call('createGame', function (error, result) {
      Session.set('currentGameID', result);
    });
  },
  'click .rockButton1': function () {
      var currentGameID = Session.get('currentGameID');
      Meteor.call('updatePlayer1Move', currentGameID, 'rock');
  },
  'click .paperButton1': function () {
      var currentGameID = Session.get('currentGameID');
      Meteor.call('updatePlayer1Move', currentGameID, 'paper');
  },
  'click .scissorsButton1': function () {
      var currentGameID = Session.get('currentGameID');
      Meteor.call('updatePlayer1Move', currentGameID, 'scissors');
  },
  'click .rockButton2': function () {
      var currentGameID = Session.get('currentGameID');
      Meteor.call('updatePlayer2Move', currentGameID, 'rock');
  },
  'click .paperButton2': function () {
      var currentGameID = Session.get('currentGameID');
      Meteor.call('updatePlayer2Move', currentGameID, 'paper');
  },
  'click .scissorsButton2': function () {
      var currentGameID = Session.get('currentGameID');
      Meteor.call('updatePlayer2Move', currentGameID, 'scissors');
  }
});

Template.openGame.helpers({
  gameId: function () {
    return "Open Game #" + this._id;
  },
  creationDate: function () {
    return this.createdAt.toLocaleDateString();
  }
});

Template.openGame.events({
  'click .joinButton': function () {
    Session.set('currentGameID', this._id);
  }
});

Template.completedGame.helpers({
  gameId: function () {
    return "Completed Game #" + this._id;
  },
  creationDate: function () {
    return this.createdAt.toLocaleDateString();
  }
});

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});