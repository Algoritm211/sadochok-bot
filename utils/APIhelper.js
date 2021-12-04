const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
});
const axios = require('axios');
const api_token = process.env.API_TOKEN;
const sport = 'soccer';
const regions = 'eu';
const markets = 'h2h';


// Main Get Func From API
const GetAllMatches = async () => {
  try {
    const {data} = await axios.get(`https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=${api_token}&regions=${regions}&markets=${markets}`);
    return FormatDataForBot(data);
  } catch (error) {
    console.log('Error status', error);
  }
}

//Format Data Before Goes To Bot
function FormatDataForBot(arrayData) {
  let formatData = arrayData;
  formatData.forEach(FormatObject);
  return formatData;
}

function FormatObject(item, index) {
  let homePrice = 1;
  let awayPrice = 1;
  let prices = item['bookmakers'][0]['markets'][0]['outcomes'];
  for (let i = 0; i < Object.keys(prices).length; i++) {
    if (prices[i]['name'] == item['home_team']) {
      homePrice = prices[i]['price'];
    } else if (prices[i]['name'] == item['away_team']) {
      awayPrice = prices[i]['price'];
    }
  }
  item['sport_title'] = item['home_team'] + '(' + homePrice + ')' + ' vs ' + item['away_team'] + '(' + awayPrice + ')';
  delete item['sport_key'];
  delete item['bookmakers'];
  delete item['home_team'];
  delete item['away_team'];
}

//For Enter Just Use:
GetAllMatches().then((data) => console.log(data));
