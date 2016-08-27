
var User = sequelize.define('user', {
  name: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING,
  description: Sequelize.STRING,
  joinDate: Sequelize.DATE
});
