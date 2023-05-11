import { Model, Sequelize, Optional, UUID, DataTypes } from 'sequelize';

interface RolePermissionAttributes {
    RoleUuid: string;
    PermissionUuid: string;
    createdAt: Date;
    deletedAt: Date;
    updatedAt: Date;
}

interface RolePermissionCreationAttributes extends Optional<RolePermissionAttributes, 'RoleUuid' | 'PermissionUuid'> { }

class RolePermission extends Model<RolePermissionAttributes, RolePermissionCreationAttributes> implements RolePermissionAttributes {
    public RoleUuid!: string;
    public PermissionUuid!: string;
    public createdAt!: Date;
    public deletedAt!: Date;
    public updatedAt!: Date;

    public static associate(models: any): void {
        RolePermission.belongsTo(models.Role, { foreignKey: 'RoleUuid' });
        RolePermission.belongsTo(models.Permission, { foreignKey: 'PermissionUuid' });
    }
}

export function initRolePermission (sequelize: Sequelize): typeof RolePermission {
    RolePermission.init(
        {
            RoleUuid: {
                type: UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: UUID,
                references: {
                    model: 'roles',
                    key: 'uuid',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            PermissionUuid: {
                type: UUID,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'permissions',
                    key: 'uuid',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
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
            tableName: 'role_permissions',
            timestamps: true,
            paranoid: true, 
        },
    );

    return RolePermission;
}
