import { DataTypes, Model, Sequelize, UUID, literal } from 'sequelize';

interface OrganizationAttributes {
    uuid: string;
    name: string;
    createdAt: Date;
    deletedAt: Date;
    updatedAt: Date;
}

interface OrganizationCreationAttributes extends Omit<OrganizationAttributes, 'uuid'> { }

class Organization extends Model<OrganizationAttributes, OrganizationCreationAttributes> implements OrganizationAttributes {
    public uuid!: string;
    public name!: string;
    public createdAt!: Date;
    public deletedAt!: Date;
    public updatedAt!: Date;

    static associate(models: any) {
        Organization.hasMany(models.User, {
            foreignKey: 'organization_uuid',
            sourceKey: 'uuid'
        });
    }
}

export function initOrganization(sequelize: Sequelize): typeof Organization {
    Organization.init(
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
            tableName: 'organizations',
        },
    );

    return Organization;
}
