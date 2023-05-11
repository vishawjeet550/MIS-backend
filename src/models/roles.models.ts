import { DataTypes, Model, Sequelize, UUID } from 'sequelize';

interface RoleAttributes {
    uuid: string;
    name: string;
    createdAt: Date;
    deletedAt: Date;
    updatedAt: Date;
}

interface RoleCreationAttributes extends Omit<RoleAttributes, 'uuid'> { }

class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
    public uuid!: string;
    public name!: string;
    public createdAt!: Date;
    public deletedAt!: Date;
    public updatedAt!: Date;

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
            sequelize,
            timestamps: true,
            paranoid: true, 
            tableName: 'roles',
        },
    );

    return Role;
}
