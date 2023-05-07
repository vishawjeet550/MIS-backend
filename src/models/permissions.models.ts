import { DataTypes, Model, Sequelize, UUID } from 'sequelize';

interface PermissionAttributes {
    uuid: string;
    name: string;
}

interface PermissionCreationAttributes extends Omit<PermissionAttributes, 'uuid'> { }

class Permission extends Model<PermissionAttributes, PermissionCreationAttributes> implements PermissionAttributes {
    public uuid!: string;
    public name!: string;

    static associate(models: any) {
        Permission.belongsToMany(models.Role, { through: models.RolePermissions });
        Permission.hasMany(models.UINavigation);
    }
}

export function initPermission(sequelize: Sequelize): typeof Permission {
    Permission.init(
        {
            uuid: {
                type: UUID,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'permissions',
        },
    );

    return Permission;
}
