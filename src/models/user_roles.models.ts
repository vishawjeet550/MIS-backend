import { DataTypes, Model, Sequelize, UUID } from 'sequelize';

interface UserRoleAttributes {
    UserUuid: string;
    RoleUuid: string;
}

interface UserRoleCreationAttributes extends UserRoleAttributes { }

class UserRole extends Model<UserRoleAttributes, UserRoleCreationAttributes> implements UserRoleAttributes {
    public UserUuid!: string;
    public RoleUuid!: string;

    static associate(models: any) {
        UserRole.belongsTo(models.User, { foreignKey: 'UserUuid' });
        UserRole.belongsTo(models.Role, { foreignKey: 'RoleUuid' });
    }
}

export function initUserRole(sequelize: Sequelize): typeof UserRole {
    UserRole.init(
        {
            UserUuid: {
                type: UUID,
                allowNull: false,
                primaryKey: true,
                field: 'UserUuid',
                references: {
                    model: 'users',
                    key: 'uuid',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            RoleUuid: {
                type: UUID,
                allowNull: false,
                primaryKey: true,
                field: 'RoleUuid',
                references: {
                    model: 'roles',
                    key: 'uuid',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
        },
        {
            sequelize,
            tableName: 'user_roles',
            indexes: [
                {
                    unique: true,
                    fields: ['UserUuid', 'RoleUuid'],
                },
            ],
        },
    );

    return UserRole;
}
