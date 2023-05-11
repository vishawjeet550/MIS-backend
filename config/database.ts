import { Sequelize } from 'sequelize';

import { initRole } from '../src/models/roles.models';
import { initPermission } from '../src/models/permissions.models';
import { initOrganization } from '../src/models/organizations.models';
import { initUser } from '../src/models/users.models';
import { initUserRole } from '../src/models/user_roles.models';
import { initRolePermission } from '../src/models/role_permissions.models';
import { initUiNavigation } from '../src/models/ui_navigation.models';
import { initReport } from '../src/models/reports.models';
import config from './env'

const { database, username, dialect, host, password }: any = config

const sequelize: Sequelize = new Sequelize(
  database,
  username,
  password,
  {
    host: host,
    dialect: dialect,
    dialectOptions: {
      decimalNumbers: true
    },
    define: {
      freezeTableName: true,
      timestamps: false
    }
  }
);

export const User = initUser(sequelize);
export const Permission = initPermission(sequelize);
export const Role = initRole(sequelize);
export const Organization = initOrganization(sequelize);
export const UserRoles = initUserRole(sequelize);
export const RolePermissions = initRolePermission(sequelize);
export const UINavigation = initUiNavigation(sequelize);
export const Report = initReport(sequelize);

Role.associate({
  User,
  UserRoles,
  RolePermissions,
  Permission
});

Permission.associate({
  RolePermissions,
  UINavigation,
  Role
});

Organization.associate({
  User,
});

User.associate({
  Role,
  UserRoles,
  Organization,
});

UserRoles.associate({
  User,
  Role,
});

RolePermissions.associate({
  Role,
  Permission,
});

Report.associate({
  Organization  
})

sequelize.sync().then(() => {
  console.info('!!! >>> db Connected <<< !!!');
});
