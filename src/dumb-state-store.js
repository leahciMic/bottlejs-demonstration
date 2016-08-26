const fs = require('fs');

module.exports = function keyValueStore(container) {
  function readStorage() {
    try {
      return JSON.parse(fs.readFileSync(container.STATE_STORE_FILE_URL, 'utf8'));
    } catch(err) {
      if (err.code === 'ENOENT') { return {}; }
      throw err;
    }
  }

  this.set = (key, value) => {
    const data = readStorage();
    data[key] = value;
    fs.writeFileSync(container.STATE_STORE_FILE_URL, JSON.stringify(data), 'utf8');
  };

  this.get = key => readStorage()[key];

  return this;
}
