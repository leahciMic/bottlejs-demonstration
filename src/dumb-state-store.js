const fs = require('fs');

module.exports = function keyValueStore({ STATE_STORE_FILE_URL }) {
  function readStorage() {
    try {
      return JSON.parse(fs.readFileSync(STATE_STORE_FILE_URL, 'utf8'));
    } catch(err) {
      if (err.code === 'ENOENT') { return {}; }
      throw err;
    }
  }

  this.set = (key, value) => {
    const data = readStorage();
    data[key] = value;
    fs.writeFileSync(STATE_STORE_FILE_URL, JSON.stringify(data), 'utf8');
  };

  this.get = key => readStorage()[key];

  return this;
}
