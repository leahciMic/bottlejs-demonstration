module.exports = function promptService() {
  return function(question) {
    const readline = require('readline');

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise(resolve => {
      rl.question(question, answer => {
        resolve(answer);
        rl.close();
      });
    });
  };
}
