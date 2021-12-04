const {DateTime} = require('luxon');

const formatMatchesToHTML = (matches) => {
  const nowFormattedTime = DateTime.now().toFormat('dd/MM/yyyy HH:mm');
  let message = '<b>Текущие матчи:</b>\n\n';

  matches.forEach((match, index) => {
    message += `<b>${index + 1}.</b> ${match.sport_title} \n`;
  });

  const endMessage = `\n<i>Актуальная информация на ${nowFormattedTime}</i>`
  message += endMessage
  return message
};

module.exports = formatMatchesToHTML
