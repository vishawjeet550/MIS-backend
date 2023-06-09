import { Model, Sequelize, Optional, UUID, STRING, DataTypes } from 'sequelize';

interface UiNavigationAttributes {
    uuid: string;
    name: string;
    url: string;
    PermissionUuid: string;
    createdAt: Date;
    deletedAt: Date;
    updatedAt: Date;
}

interface UiNavigationCreationAttributes extends Optional<UiNavigationAttributes, 'uuid'> { }

class UiNavigation extends Model<UiNavigationAttributes, UiNavigationCreationAttributes> implements UiNavigationAttributes {
    public uuid!: string;
    public name!: string;
    public url!: string;
    public PermissionUuid!: string;
    public createdAt!: Date;
    public deletedAt!: Date;
    public updatedAt!: Date;

    public static associate(models: any): void {
        UiNavigation.belongsTo(models.Permission, { foreignKey: 'PermissionUuid' });
    }
}

export function initUiNavigation (sequelize: Sequelize): typeof UiNavigation {
    UiNavigation.init(
        {
            uuid: {
                type: UUID,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: STRING(255),
                allowNull: false,
            },
            url: {
                type: STRING(255),
                allowNull: false,
            },
            PermissionUuid: {
                type: UUID,
                allowNull: false,
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
            tableName: 'ui_navigation',
            timestamps: true,
            paranoid: true, 
        },
    );

    return UiNavigation;
}
