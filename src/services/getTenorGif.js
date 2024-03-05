const { chooseRandomOptionFromArray } = require("./../utils/utils");
const { TENOR_API } = require("./../configs/api");

async function getTenorGif(queryMsg) {
  const query = queryMsg.replace(/ /g, "%20");

  const response = await fetch(
    TENOR_API + `key=${process.env.TENOR_API_KEY}&q=${query}&limit=20`
  );
  const data = await response.json();

  const gifObj = chooseRandomOptionFromArray(data.results);
  return gifObj.url;
}

module.exports = {
  getTenorGif,
};
