const {Scenes} = require('telegraf');
const {mainMenuKeyboard} = require('../keyboards/main-menu.keyboard');
const exitKeyboard = require('../keyboards/exit.keyboard');
const faqCategoryKeyboard = require('../keyboards/faq-category.keyboard');
const {BaseScene} = Scenes;
const faqScene = new BaseScene('FAQ_SCENE');

const categoryHandler = async (ctx) => {
  await ctx.reply(
    '💸 Ставка (интерактивная) — сумма денег, которую игрок передаёт организатору пари на условиях, оговоренных правилами игры.\n \n 󠀥󠀥󠀥󠀥💯 Коэффициент — множитель для вычисления суммы выплаты по выигрышному пари. Чтобы получить чистый выигрыш, нужно из суммы выплаты вычесть размер ставки. Например - вы ставите на коэффициент 2 ровно 100 гривен. В случае выигрыша - вы получите 200 грн! И чтобы понять чистый выигрыш - отнимем от 200 вашу ставку - 100 гривен. 200 - 100 = 100 гривен в честь вашей победы! \n \n 🔴 Лайв (Live) — перечень спортивных событий, на которые можно сделать ставку в режиме реального времени. \n \n Остались вопросы? Смело жмите "подробнее"! 🔥',
    faqCategoryKeyboard
  );
};

faqScene.enter(categoryHandler);

faqScene.action(/^category:[a-z]+$/, async (ctx) => {
  await ctx.reply(`Отправляем видео от нашего специалиста 👨🏽‍🏫, который поможет вам лучше разобраться во всём! 🙌🏼`, exitKeyboard);
});

faqScene.hears('Главное меню', async (ctx) => {
  await ctx.scene.leave();
  await ctx.reply('🏡Вы перешли в главное меню🏡', mainMenuKeyboard);
});

module.exports = faqScene;
