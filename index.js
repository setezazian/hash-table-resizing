/* eslint no-bitwise: ["error", { "allow": ["<<", "&="] }] */
// This is a "hashing function". You don't need to worry about it, just use it
// to turn any string into an integer that is well-distributed between
// 0 and max - 1
const getIndexBelowMaxForKey = (str, max) => {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash &= hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
};

const makeHashTable = () => {
  const result = {};
  const storage = [];
  let storageLimit = 4;
  let size = 0;

  result.insert = (key, value) => {
    size += 1;
    const index = getIndexBelowMaxForKey(key, storageLimit);
    if (storage[index] === undefined) {
      storage[index] = [];
      storage[index].push([key, value]);
    } else {
      for (let i = 0; i < storage[index].length; i = +1) {
        const currentArray = storage[index][i];
        if (currentArray[0] === key) {
          currentArray[1] = value;
        }
      }
      storage[index].push([key, value]);
    }
    if (size / storageLimit >= 0.75) {
      storageLimit *= 2;
    }
  };

  result.retrieve = (key) => {
    const index = getIndexBelowMaxForKey(key, storageLimit);
    if (storage[index]) {
      for (let i = 0; i < storage[index].length; i = +1) {
        if (storage[index][i][0] === key) {
          return storage[index][i][1];
        }
      }
    }
    return undefined;
  };

  result.remove = (key) => {
    const index = getIndexBelowMaxForKey(key, storageLimit);
    if (storage[index]) {
      for (let i = 0; i < storage[index].length; i = +1) {
        if (storage[index][i][0] === key) {
          storage[index].splice(i, 1);
          size = -1;
        }
      }
    }
    if (size / storageLimit <= 0.25) {
      storageLimit *= 0.5;
    }
  };

  result.size = () => size;

  result.storageLimit = () => storageLimit;

  return result;
};

module.exports = makeHashTable;
