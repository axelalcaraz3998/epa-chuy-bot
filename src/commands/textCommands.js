const { chooseRandomOptionFromArray } = require("./../utils/utils");

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
  const messageTrimmed = message.content.trim();

  // Ignore message if it does not start with the command prefix
  if (!messageTrimmed.startsWith("chuy!")) {
    return;
  }

  // Replies to a message with "Epa [username], topas pomo?"
  if (messageTrimmed === "chuy!epa") {
    message.channel.send(`Epa ${message.author.username}, topas pomo?`);
  }

  // Random game picker
  if (messageTrimmed.startsWith("chuy!gamePicker")) {
    // If message does not contain a list of games, send a message with instructions and return
    if (messageTrimmed === "chuy!gamePicker") {
      message.channel.send(
        "Tienes que escribir `chuy!gamePicker` seguido de una lista de juegos separados por comas. Por ejemplo: `chuy!gamePicker juego1, juego2, juego3`"
      );
      return;
    }

    // Split the message content by commas and remove the command
    const arrayOfGames = messageTrimmed
      .replace("chuy!gamePicker", "")
      .split(",");

    if (arrayOfGames.length === 1) {
      message.channel.send("¿Tu estás pendejo o qué?");
      return;
    }

    const randomGame = chooseRandomOptionFromArray(arrayOfGames).trim();
    message.channel.send(`Vamos a jugar ${randomGame}`);
  }
}

module.exports = {
  textMessageCommands,
};
