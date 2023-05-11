import { DataTypes, Model, Sequelize, UUID } from 'sequelize';

interface ReportAttributes {
    id: number;
    organization_id: number;
    report_type: string;
    report_date: Date;
    report_data: string;
    createdAt: Date;
    deletedAt: Date;
    updatedAt: Date;
}

class Report extends Model<ReportAttributes> implements ReportAttributes {
    public id!: number;
    public organization_id!: number;
    public report_type!: string;
    public report_date!: Date;
    public report_data!: string;
    public createdAt!: Date;
    public deletedAt!: Date;
    public updatedAt!: Date;

    static associate(models: any) {
        Report.belongsTo(models.Organization, { foreignKey: 'organization_id' });
    }
}

export function initReport(sequelize: Sequelize): typeof Report {
    Report.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            organization_id: {
                type: UUID,
                allowNull: false,
                references: {
                    model: "organizations",
                    key: 'uuid'
                }
            },
            report_type: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            report_date: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            report_data: {
                type: DataTypes.TEXT,
                allowNull: false
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
            tableName: 'reports',
            underscored: true
        }
    );

    return Report;
}
