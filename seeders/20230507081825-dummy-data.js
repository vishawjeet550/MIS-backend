const uuid = require('uuid');
const { faker } = require('@faker-js/faker')

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // Insert 100 organizations
    const organizations = [];
    for (let i = 0; i < 100; i++) {
      organizations.push({
        uuid: uuid.v4(),
        name: faker.company.name(),
      });
    }
    await queryInterface.bulkInsert('organizations', organizations, {});

    // Insert 100 permissions
    const permissions = [];
    for (let i = 0; i < 100; i++) {
      permissions.push({
        uuid: uuid.v4(),
        name: faker.lorem.word(),
      });
    }
    await queryInterface.bulkInsert('permissions', permissions, {});

    // Insert 100 roles
    const roles = [];
    for (let i = 0; i < 100; i++) {
      roles.push({
        uuid: uuid.v4(),
        name: faker.name.jobTitle(),
      });
    }
    await queryInterface.bulkInsert('roles', roles, {});

    // Insert 100 users
    const users = [];
    for (let i = 0; i < 100; i++) {
      const organization = await queryInterface.rawSelect('organizations', {
        order: Sequelize.fn('RAND'),
        limit: 1,
      }, ['uuid']);
      users.push({
        uuid: uuid.v4(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
        organization_uuid: organization,
      });
    }
    await queryInterface.bulkInsert('users', users, {});

    // Insert user roles
    const userRoles = [];
    const userUUIDs = await queryInterface.sequelize.query(
      `SELECT uuid FROM users`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    const roleUUIDs = await queryInterface.sequelize.query(
      `SELECT uuid FROM roles`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    userUUIDs.forEach((user) => {
      const randomRoleIndex = Math.floor(Math.random() * roleUUIDs.length);
      const role = roleUUIDs[randomRoleIndex];
      userRoles.push({
        UserUuid: user.uuid,
        RoleUuid: role.uuid,
      });
    });
    await queryInterface.bulkInsert('user_roles', userRoles, {});

    // Insert role permissions
    const rolePermissions = [];
    roleUUIDs.forEach((role) => {
      const randomPermissionIndex = Math.floor(Math.random() * permissions.length);
      const permission = permissions[randomPermissionIndex];
      rolePermissions.push({
        RoleUuid: role.uuid,
        PermissionUuid: permission.uuid,
      });
    });
    await queryInterface.bulkInsert('role_permissions', rolePermissions, {});

    // Insert UI navigation
    const uiNavigation = [];
    permissions.forEach((permission) => {
      uiNavigation.push({
        uuid: uuid.v4(),
        name: faker.lorem.word(),
        url: faker.internet.url(),
        PermissionUuid: permission.uuid,
      });
    });
    await queryInterface.bulkInsert('ui_navigation', uiNavigation, {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ui_navigation', null, {});
    await queryInterface.bulkDelete('role_permissions', null, {});
    await queryInterface.bulkDelete('user_roles', null, {});
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('roles', null, {});
    await queryInterface.bulkDelete('permissions', null, {});
    await queryInterface.bulkDelete('organizations', null, {});
  }
};
