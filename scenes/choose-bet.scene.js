const {Scenes, Markup} = require('telegraf');
const betCategoryKeyboard = require('../keyboards/bet-category.keyboard');
const mainMenuKeyboard = require('../keyboards/main-menu.keyboard');
const exitKeyboard = require('../keyboards/exit.keyboard');
const {BaseScene} = Scenes;
const chooseBetScene = new BaseScene('CHOOSE_BET_SCENE');

const categoryHandler = async (ctx) => {
  await ctx.reply('Выберите желаемую категорию для ставок', betCategoryKeyboard);
};

chooseBetScene.enter(categoryHandler);

// /^category:[\D]+$/
chooseBetScene.action(/^category:[a-z]+$/, async (ctx) => {
  // Getting "football" from "category:football"
  const category = ctx.callbackQuery.data.split(':')[1];
  await ctx.reply(`Вы выбрали категорию ${category}, тут ваши ставки`, exitKeyboard);
});

chooseBetScene.hears('Главное меню', async (ctx) => {
  await ctx.scene.leave();
  await ctx.reply('В настоящий момент в главном меню', mainMenuKeyboard);
});

module.exports = chooseBetScene;
