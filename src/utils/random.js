/**
 * Function to get a random number

 * @param {Number} minValue 
 * @param {Number} maxValue 
 * @returns {Number}
 */

function getRandomNumber(minValue, maxValue) {
  if (minValue === maxValue) return minValue;

  if (minValue > maxValue)
    throw new Error("Minimum value must be less than maximum value.");

  return Math.floor(Math.random() * maxValue) + minValue;
}

/**
 * Function to pick a random element(s) from array
 *
 * @param {any[]} array
 * @param {Number} amount
 * @param {any[]}
 */

function pickRandomElements(array, amount = 1) {
  if (array.length === 0) return [];

  const removableArray = [...array];
  const picked = [];

  for (let i = 0; i < amount; i++) {
    const randomIndex = getRandomNumber(0, removableArray.length - 1);
    picked.push(removableArray[randomIndex]);
    removableArray.splice(randomIndex, 1);

    if (removableArray.length === 0) break;
  }

  if (amount === 1) return picked.slice(0, 1);

  return picked;
}

/**
 * Function to split array in random chunks
 *
 * @param {*} array Array to chunk
 * @param {*} options Options object
 * @param {*} options.minChunkSize Minimum chunk size
 * @param {*} options.maxChunkSize Maximum chunk size
 * @returns
 */
function getRandomChunks(array, { minChunkSize = 1, maxChunkSize = 5 }) {
  let remainingChunks = array.length;

  const chunks = [];
  let chunkStartPosition = 0;

  while (remainingChunks > 0) {
    let chunkSize = null;
    if (maxChunkSize > remainingChunks) {
      if (minChunkSize > remainingChunks) {
        chunkSize = getRandomNumber(1, remainingChunks);
      } else {
        chunkSize = getRandomNumber(minChunkSize, remainingChunks);
      }
    } else {
      chunkSize = getRandomNumber(minChunkSize, maxChunkSize);
    }

    const chunkEndPosition = chunkStartPosition + chunkSize;

    const chunk = array.slice(chunkStartPosition, chunkEndPosition);
    chunks.push(chunk);

    chunkStartPosition = chunkEndPosition;
    remainingChunks -= chunkSize;
  }

  return chunks;
}

module.exports = { getRandomNumber, pickRandomElements, getRandomChunks };
