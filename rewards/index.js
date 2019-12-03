const fs = require('fs');
const User = require('./User.js');

let user = new User();
user.generate(() => {
  let data = {};
  Object.entries(user).forEach(([key, value]) => {data[key] = value})
  fs.writeFile('user.json', JSON.stringify(data), (err) => {
      if (err) throw err;
  });
})
