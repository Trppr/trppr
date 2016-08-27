var User = sequelize.define('user', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  description: Sequelize.TEXT,
  join_date: Sequelize.DATE
})
