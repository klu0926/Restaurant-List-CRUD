// handlebars helpers
const Handlebars = require('handlebars')

Handlebars.registerHelper('isSame', function (string1, string2, options) {
  if (string1 === string2) {
    return options.fn(this)
  }
  return options.inverse(this);
})