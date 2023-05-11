import { DataTypes, Model, Sequelize, UUID } from 'sequelize';

interface PermissionAttributes {
    uuid: string;
    name: string;
    createdAt: Date;
    deletedAt: Date;
    updatedAt: Date;
}

interface PermissionCreationAttributes extends Omit<PermissionAttributes, 'uuid'> { }

class Permission extends Model<PermissionAttributes, PermissionCreationAttributes> implements PermissionAttributes {
    public uuid!: string;
    public name!: string;
    public createdAt!: Date;
    public deletedAt!: Date;
    public updatedAt!: Date;

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
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            deletedAt: {
                type: DataTypes.DATE,
                defaultValue: null
            }
        },
        {
            timestamps: true,
            paranoid: true, 
            sequelize,
            tableName: 'permissions',
        },
    );

    return Permission;
}
