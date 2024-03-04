function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function chooseRandomOptionFromArray(array) {
  const randomIndex = getRandomInt(0, array.length - 1);
  const randomChoice = array[randomIndex];

  return randomChoice;
}

module.exports = {
  getRandomInt,
  chooseRandomOptionFromArray,
};
