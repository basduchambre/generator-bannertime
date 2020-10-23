/**
 * The generator intro message.
 */

const chalk = require('chalk');

module.exports = function intro() {
  const message = chalk.yellow('\n Let\'s make some banners') +
    chalk.green('\n  Growise says:') +
    chalk.green('\n  _____                     _   _') +
    chalk.green('\n | __  |___ ___ ___ ___ ___| |_|_|_____ ___') +
    chalk.green('\n | __ -| . |   |   | -_|  _|  _| |     | -_|') +
    chalk.green('\n |_____|__,|_|_|_|_|___|_| |_| |_|_|_|_|___|\n');
  this.log(message);
};
