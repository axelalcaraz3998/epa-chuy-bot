const {
  chooseRandomOptionFromArray,
  trimMessage,
} = require("./../utils/utils");
const { TENOR_API } = require("./../configs/api");
const { getTenorGif } = require("./../services/getTenorGif");

// Utilities
function sendMessageToCurrentChannel(message, content) {
  message.channel.send(content);
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
  const messageTrimmed = trimMessage(message.content);

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

async function gif(message) {
  const messageTrimmed = trimMessage(message.content);

  // If no query is provided, send a random fortnite default dance gif
  if (messageTrimmed === "chuy!gif") {
    const gifURL = await getTenorGif("fortnite default dance");

    sendMessageToCurrentChannel(message, gifURL);
    return;
  }

  // Split the message content by spaces and remove the command
  const queryMsg = messageTrimmed.replace("chuy!gif", "").trim();
  const gifURL = await getTenorGif(queryMsg);

  sendMessageToCurrentChannel(message, gifURL);
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
  const messageTrimmed = trimMessage(message.content);

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

  if (messageTrimmed.startsWith("chuy!gif")) {
    gif(message);
  }
}

module.exports = {
  textMessageCommands,
};
