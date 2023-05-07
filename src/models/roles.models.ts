import { DataTypes, Model, Sequelize, UUID } from 'sequelize';

interface RoleAttributes {
    uuid: string;
    name: string;
}

interface RoleCreationAttributes extends Omit<RoleAttributes, 'uuid'> { }

class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
    public uuid!: string;
    public name!: string;

    static associate(models: any) {
        Role.belongsToMany(models.User, { through: models.UserRoles });
        Role.belongsToMany(models.Permission, { through: models.RolePermissions });
    }
}

export function initRole(sequelize: Sequelize): typeof Role {
    Role.init(
        {
            uuid: {
                type: UUID,
                allowNull: false,
                defaultValue: UUID,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'roles',
        },
    );

    return Role;
}
