const {Markup} = require('telegraf');


const exitKeyboard = Markup.keyboard([
  ['Главное меню'],
]).oneTime().resize();


module.exports = exitKeyboard;
