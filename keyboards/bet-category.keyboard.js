const {Markup} = require('telegraf');

const betCategoryKeyboard = Markup.inlineKeyboard([
  Markup.button.callback('⚽️Футбол⚽️', 'category:soccer'),
  Markup.button.callback('🏀Баскетбол🏀', 'category:basketball')
], {columns: 1}).oneTime();

module.exports = betCategoryKeyboard
