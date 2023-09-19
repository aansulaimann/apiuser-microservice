'use strict';
const bcrypt = require('bcrypt')

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('users', [
      {
        name: "aan",
        profession: "student",
        role: "admin",
        email: "aan@mail.com",
        password: await bcrypt.hash('password123', 10),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "sulaiman",
        profession: "student",
        role: "student",
        email: "sulaiman@mail.com",
        password: await bcrypt.hash('password123', 10),
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
