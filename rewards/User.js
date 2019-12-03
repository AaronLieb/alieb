const fs = require('fs');

module.exports = class user {
  generate() {
    console.log("Generating...")
    fs.readFile('names.csv', (err, data) => {
      let names = data.toString('utf8').split(",");
      this.firstName = names[rand(0,1999)];
      this.lastName = names[rand(2000,2999)];
      this.email = generateEmail(this.firstName, this.lastName);
      this.birthday = new Date();
      let data = {};
      Object.entries(this).forEach(([key, value]) => {data[key] = value})
      fs.writeFile('user.json', JSON.stringify(data), (err) => {
          if (err) throw err;
      });
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
