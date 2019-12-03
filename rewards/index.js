const User = require('./User.js');

let user = new User();
user.generate(() => {
  console.log(user.firstName)
  console.log(user.lastName);
  console.log(user.email)
  console.log(user.birthday)
})
