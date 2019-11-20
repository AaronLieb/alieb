const fs = require('fs');

module.exports = {
  generateUser = () => {
    fs.readFile('names.csv', (err, data) => {
      let names = data.toString('utf8').split(",");
      // 0-1999 are first names, 2000-2999 are last names
      let firstName = names[rand(0,1999)];
      let lastName = names[rand(2000,2999)];
      let email = generateEmail(firstName, lastName);
      return {
        firstName: firstName,
        lastName: lastName,
        email: email,
      }
    })
  }
}

function generateEmail(first, last) {
  let layout = ["^.$#","^$#","^#$","$.^","^##","$##","$^#"];
  let layoutR = layout[rand(0,layout.length)];
  let emails = ["gmail.com","yahoo.com","outlook.com"]
  let emailR = emails[rand(0, emails.length)];
  let number = rand(0,9) + "" + rand(0,9)
  if (rand(0,9) > 6) number += "" + rand(0,9)
  let email = layoutR.replace("^", first).replace("$", last).replace("#", number).replace("#", number) + "@" + emailR;
  return email;
}

function rand(min, max) {
  return Math.floor(Math.random() * (max-min)) + min;
}
