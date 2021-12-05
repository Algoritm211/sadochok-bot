const {Telegraf, Markup, session, Scenes} = require('telegraf');
require('dotenv').config();
const consola = require('consola');
const mongoose = require('mongoose');
const {mainMenuKeyboard, redirectToPlatform, makeForecast} = require('./keyboards/main-menu.keyboard');
const chooseBetScene = require('./scenes/choose-bet.scene');
const forecastScene = require('./scenes/forecast.scene');
const faqScene = require('./scenes/faq.scene');
const phrases = require('./phrases.json')

const bot = new Telegraf(process.env.BOT_TOKEN);
const stage = new Scenes.Stage([chooseBetScene, forecastScene, faqScene]);
bot.use(session());
bot.use(stage.middleware());

// Start message
bot.start(async (ctx) => {
  const userName = ctx.message.from.first_name;
  ctx.reply(`🔸<i>Доброго времени суток, ${userName}!🔸</i>\n\n${phrases.startPhrase}`,
    {parse_mode: 'HTML', reply_markup: mainMenuKeyboard.reply_markup})
});

bot.on('text', async (ctx) => {
  switch (ctx.message.text) {
    case '💰Ставки💰':
      await ctx.scene.enter('CHOOSE_BET_SCENE');
      return;
    case '📊Прогнозы📊':
      await ctx.scene.enter('CHOOSE_FORECAST_SCENE');
      return;
    case '👨‍💻Мой кабинет👨‍💻':
      await bot.telegram.sendMessage(
        ctx.message.chat.id,
        `<b>Личный профиль пользователя</b>\n\n<i>Ваше имя: ${ctx.message.from.first_name}</i>\n\nВ настоящий момент нет дополнительной информации
        `,

        {
          parse_mode: 'HTML', reply_markup: {
            inline_keyboard: [[
              Markup.button.callback('Сделать прогноз', 'maintenance'),
            ]],
          },
        },
      );
      return;
    case '🖥Платформа🖥':
      await ctx.reply('Перейти на платформу с прогнозами', redirectToPlatform);
      return;
    case '🎓Основы🎓':
      await ctx.scene.enter('FAQ_SCENE');
      return;
    default:
      return await ctx.reply('Я не знаю такой команды, воспользуйтесь предоставленными кнопками');
  }
});

bot.action('maintenance', (ctx) => {
  ctx.answerCbQuery(
    'В настоящее время опция в разработке',
    {show_alert: true},
  );
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
