import { DataTypes, Model, Sequelize, UUID } from 'sequelize';

interface UserAttributes {
  uuid: string;
  username: string;
  password: string;
  email: string;
  organization_uuid: string;
}

interface UserCreationAttributes extends Omit<UserAttributes, 'uuid'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public uuid!: string;
  public username!: string;
  public password!: string;
  public email!: string;
  public organization_uuid!: string;

  static associate(models: any) {
    User.belongsTo(models.Organization, { foreignKey: 'organization_uuid' });
    User.belongsToMany(models.Role, { through: models.UserRoles });
  }
}

export function initUser(sequelize: Sequelize): typeof User {
  User.init(
    {
      uuid: {
        type: UUID,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      organization_uuid: {
        type: UUID,
        allowNull: false,
        references: {
          model: 'organizations',
          key: 'uuid',
        },
      },
    },
    {
      sequelize,
      tableName: 'users',
    },
  );

  return User;
}
