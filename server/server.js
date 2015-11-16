Meteor.publish("games");

Meteor.methods({
  createGame: function () {
    var newGame = Games.insert({
      createdAt: new Date(),
      player1Move: '',
      player2Move: ''
    });
    return newGame;
  },
  updatePlayer1Move: function (gameId, move) {
    Games.update(gameId, { $set: { player1Move: move } });
    return move;
  },
  updatePlayer2Move: function (gameId, move) {
    Games.update(gameId, { $set: { player2Move: move } });
    return move;
  }
});