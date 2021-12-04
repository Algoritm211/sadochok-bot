const {Scenes} = require('telegraf');
const {mainMenuKeyboard} = require('../keyboards/main-menu.keyboard');
const exitKeyboard = require('../keyboards/exit.keyboard');
const forecastCategoryKeyboard = require('../keyboards/forecast-category.keyboard');
const {BaseScene} = Scenes;
const forecastScene = new BaseScene('CHOOSE_FORECAST_SCENE');

const categoryHandler = async (ctx) => {
  await ctx.reply(
    '📊Пожалуйста, выберите желаемую категорию для 💠прогнозов💠',
    forecastCategoryKeyboard
  );
};

forecastScene.enter(categoryHandler);

// /^category:[\D]+$/
forecastScene.action(/^category:[a-z]+$/, async (ctx) => {
  // Getting "football" from "category:football"
  const category = ctx.callbackQuery.data.split(':')[1];
  await ctx.reply(`Вы выбрали категорию ${category}, далее Ваши прогнозы`, exitKeyboard);
});

forecastScene.hears('Главное меню', async (ctx) => {
  await ctx.scene.leave();
  await ctx.reply('🏡Вы перешли в главное меню🏡', mainMenuKeyboard);
});

module.exports = forecastScene;
