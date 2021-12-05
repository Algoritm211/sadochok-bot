const {Markup} = require('telegraf');

const forecastCategoryKeyboard = Markup.inlineKeyboard([
  Markup.button.callback('❔Подробнее❔', 'category:videomessages'),
]).oneTime().resize(true);

module.exports = forecastCategoryKeyboard
