const {Telegraf, Markup} = require('telegraf');
require('dotenv').config();
const consola = require('consola');
const mongoose = require('mongoose');

const bot = new Telegraf(process.env.BOT_TOKEN);

const mainMenuKeyboard = Markup.keyboard([
  ['Ставки', 'Прогнозы'],
  ['Мой кабинет', 'Платформа'],
]).oneTime().resize();

// Start message
bot.start(async (ctx) => {
  const userName = ctx.message.from.first_name;
  ctx.reply(`Hello, ${userName}!\n\n`, {parse_mode: 'HTML', reply_markup: mainMenuKeyboard.reply_markup});
});

const START = async () => {
  await bot.launch();
  await mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      tls: true,
    })
    .then(() => consola.success('Database Connected'))
    .catch(err => consola.error(err));
  consola.success('Bot was started');
};

START();


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
