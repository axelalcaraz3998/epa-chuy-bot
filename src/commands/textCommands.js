const { chooseRandomOptionFromArray } = require("./../utils/utils");

// Utilities
function sendMessageToCurrentChannel(message, content) {
  message.channel.send(content);
}

function trimMessageContent(message) {
  return message.content.trim();
}

// Functions for text message commands

// Replies to a message with "Epa [username], topas pomo?"
function epa(message) {
  sendMessageToCurrentChannel(
    message,
    `Epa Chuy ${message.author.username}, topas pomo?`
  );
}

// Random game picker
function gamePicker(message) {
  const messageTrimmed = trimMessageContent(message);

  // If message does not contain a list of games, send a message with instructions and return
  if (messageTrimmed === "chuy!gamePicker") {
    sendMessageToCurrentChannel(
      message,
      "Tienes que escribir `chuy!gamePicker` seguido de una lista de juegos separados por comas. Por ejemplo: `chuy!gamePicker juego1, juego2, juego3`"
    );
    return;
  }

  // Split the message content by commas and remove the command
  const arrayOfGames = messageTrimmed.replace("chuy!gamePicker", "").split(",");

  if (arrayOfGames.length === 1) {
    sendMessageToCurrentChannel(message, "¿Tu estás pendejo o qué?");
    return;
  }

  const randomGame = chooseRandomOptionFromArray(arrayOfGames).trim();
  sendMessageToCurrentChannel(message, `Vamos a jugar ${randomGame} Chuy`);
}

/*
  List of commands:
  - chuy!epa
  - chuy!gamePicker
*/
function textMessageCommands(message) {
  // Ignore messages from bots
  if (message.author.bot) {
    return;
  }

  // Trim the message content
  const messageTrimmed = trimMessageContent(message);

  // Ignore message if it does not start with the command prefix
  if (!messageTrimmed.startsWith("chuy!")) {
    return;
  }

  if (messageTrimmed === "chuy!epa") {
    epa(message);
  }

  if (messageTrimmed.startsWith("chuy!gamePicker")) {
    gamePicker(message);
  }
}

module.exports = {
  textMessageCommands,
};
