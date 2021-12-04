const {Scenes} = require('telegraf');
const betCategoryKeyboard = require('../keyboards/bet-category.keyboard');
const {mainMenuKeyboard} = require('../keyboards/main-menu.keyboard');
const exitKeyboard = require('../keyboards/exit.keyboard');
const getAllMatches = require('../utils/APIhelper');
const formatMatchesToHTML = require('../utils/messages-formatter');
const {BaseScene} = Scenes;
const chooseBetScene = new BaseScene('CHOOSE_BET_SCENE');

const categoryHandler = async (ctx) => {
  await ctx.reply('Выберите желаемую категорию для ставок', betCategoryKeyboard);
};

chooseBetScene.enter(categoryHandler);

// /^category:[\D]+$/
chooseBetScene.action(/^category:[a-z]+$/, async (ctx) => {
  // Getting "football" from "category:football"
  await ctx.editMessageText('Загрузка...')
  const category = ctx.callbackQuery.data.split(':')[1];
  const matchesData = await getAllMatches(category);
  const formattedMessage = formatMatchesToHTML(matchesData);
  await ctx.telegram.sendMessage(
    ctx.update.callback_query.from.id,
    formattedMessage,
    {parse_mode: 'HTML', reply_markup: exitKeyboard.reply_markup}
  );
});

chooseBetScene.hears('Главное меню', async (ctx) => {
  await ctx.scene.leave();
  await ctx.reply('В настоящий момент в главном меню', mainMenuKeyboard);
});

module.exports = chooseBetScene;
