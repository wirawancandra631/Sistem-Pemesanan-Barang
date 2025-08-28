'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("table_price_grosir", [
      {
        "product_id": 1,
        "min_qty": 10,
        "price_grosir": 90000
      },

      {
        "product_id": 1,
        "min_qty": 5,
        "price_grosir": 80000
      },
      {
        "product_id": 1,
        "min_qty": 3,
        "price_grosir": 70000
      },

    ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
