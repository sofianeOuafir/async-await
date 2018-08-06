const axios = require('axios');
// const getExchangeRate = (from, to) => {
//   return axios.get('http://data.fixer.io/api/latest?access_key=b61d161e8678ab52fdca11e7cfde5348&format=1')
//     .then((results) => {
//       var conversionRate = results.data.rates[to] / results.data.rates[from];
//       if (isNaN(conversionRate)){
//         throw new Error('Unsuitable currency given');
//       }
//       return conversionRate;
//     }).catch((e) => e.message)
// };

// const getCountries = (currencyCountry) => {
//   return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCountry}`)
//     .then((response) => {
//       return response.data.map((country) => country.name);
//     }).catch((e) => e.message);
// };

const getExchangeRate = async (from, to) => {
  try {
    var results = await axios.get('http://data.fixer.io/api/latest?access_key=b61d161e8678ab52fdca11e7cfde5348&format=1');
    var rate = results.data.rates[to] / results.data.rates[from];
    if (isNaN(rate)){
      throw new Error();
    }
    return rate;
  } catch(e) {
    throw new Error(`Unable to get currency for ${from} and ${to}`);
  }

};

const getCountries = async (currencyCountry) => {
  try{
    response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCountry}`);
    return response.data.map((country) => country.name);
  } catch(e) {
    throw new Error(`Unable to get countries for currency ${currencyCountry}`);
  }
};

var convertCurrency = async (from, to, amount) => {
  var exchangeRate = await getExchangeRate(from, to);
  var countries = await getCountries(to);
  var convertedAmount = (amount * exchangeRate).toFixed(2);

  return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend this in the following countries: ${countries.join(', ')}`;
}

convertCurrency('USD', 'GBP', 2450).then((data) => {
  console.log(data);
}).catch((e) => console.log(e.message));

// getCountries('U').then((data) => {
//   console.log(data);
// }).catch((e) => console.log(e.message));
