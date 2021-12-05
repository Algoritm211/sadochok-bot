const {Markup} = require('telegraf');

const mainMenuKeyboard = Markup.keyboard([
  ['💰Ставки💰', '📊Прогнозы📊'],
  ['👨‍💻Мой кабинет👨‍💻', '🖥Платформа🖥'],
  ['🎓Основы🎓'],
]).oneTime().resize();

const redirectToPlatform = Markup.inlineKeyboard([
  Markup.button.url('⏫Перейти⏫', 'google.com')
])

const makeForecast = Markup.inlineKeyboard([
  Markup.button.callback('📈Сделать прогноз📈', 'maintenance')
])
module.exports = {mainMenuKeyboard, redirectToPlatform, makeForecast}

