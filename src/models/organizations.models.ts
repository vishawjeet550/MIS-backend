import { DataTypes, Model, Sequelize, UUID } from 'sequelize';

interface OrganizationAttributes {
    uuid: string;
    name: string;
}

interface OrganizationCreationAttributes extends Omit<OrganizationAttributes, 'uuid'> { }

class Organization extends Model<OrganizationAttributes, OrganizationCreationAttributes> implements OrganizationAttributes {
    public uuid!: string;
    public name!: string;

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
        },
        {
            sequelize,
            tableName: 'organizations',
        },
    );

    return Organization;
}
