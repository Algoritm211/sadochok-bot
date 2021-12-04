const {Markup} = require('telegraf');

const forecastCategoryKeyboard = Markup.inlineKeyboard([
  Markup.button.callback('💻Киберспорт💻', 'category:cybersport'),
]).oneTime().resize(true);

module.exports = forecastCategoryKeyboard
