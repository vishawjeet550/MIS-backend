'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const organizations = await queryInterface.sequelize.query('SELECT uuid from organizations;');

    const reports = [];
    organizations[0].forEach((org) => {
      for (let i = 0; i < 100; i++) {
        reports.push({
          organization_id: org.uuid,
          report_type: `Report Type ${i}`,
          report_date: new Date(),
          report_data: JSON.stringify({
            data: Math.random(),
            info: `Random info ${i}`
          }),
          created_at: new Date(),
          updated_at: new Date()
        });
      }
    });

    return queryInterface.bulkInsert('reports', reports, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('reports', null, {});
  }
};
