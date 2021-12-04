const {Markup} = require('telegraf');

const betCategoryKeyboard = Markup.inlineKeyboard([
  Markup.button.callback('Футбол', 'category:football'),
  Markup.button.callback('Теннис', 'category:tennis')
]).oneTime();

module.exports = betCategoryKeyboard
