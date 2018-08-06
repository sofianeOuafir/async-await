const axios = require('axios');
var convert = (from, to, amount) => {
  return axios.get('http://data.fixer.io/api/latest?access_key=b61d161e8678ab52fdca11e7cfde5348&format=1')
    .then((results) => {
      var conversionRate = results.data.rates[to] / results.data.rates[from];
      if (isNaN(conversionRate)){
        throw new Error('Unsuitable currency given');
      }
      return amount * conversionRate;
    }).catch((e) => e.message)
}

// convert('GBP', 'CAD', 1).then((result) => {
//   console.log(result);
// });

var foo = async (from, to, amount) => {
  var amount = await convert(from, to, amount);
  console.log(amount);
}

foo('EUR', 'GBP', 17000);
//20 USD is worth 26 CAD. You can spend this in the following countries: Canada.