const {Markup} = require('telegraf');

const mainMenuKeyboard = Markup.keyboard([
  ['Ставки', 'Прогнозы'],
  ['Мой кабинет', 'Платформа'],
]).oneTime().resize();

module.exports = mainMenuKeyboard
