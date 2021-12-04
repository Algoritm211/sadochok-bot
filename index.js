const {Telegraf, Markup, session, Scenes} = require('telegraf');
require('dotenv').config();
const consola = require('consola');
const mongoose = require('mongoose');
const mainMenuKeyboard = require('./keyboards/main-menu.keyboard');
const chooseBetScene = require('./scenes/choose-bet.scene');

const bot = new Telegraf(process.env.BOT_TOKEN);
const stage = new Scenes.Stage([chooseBetScene]);
bot.use(session());
bot.use(stage.middleware());

// Start message
bot.start(async (ctx) => {
  const userName = ctx.message.from.first_name;
  ctx.reply(`Hello, ${userName}!\n\n`,
    {parse_mode: 'HTML', reply_markup: mainMenuKeyboard.reply_markup});
});

bot.on('text', async (ctx) => {
  switch (ctx.message.text) {
    case 'Ставки':
      await ctx.scene.enter('CHOOSE_BET_SCENE')
      return
    default:
      return await ctx.reply('Повторите еще раз')
  }
})

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
