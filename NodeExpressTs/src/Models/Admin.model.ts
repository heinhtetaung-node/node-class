import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from './index'

interface AdminAttributesNoPw{
    id: number;
    name : string;
    email : string;  
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

interface AdminAttributes extends AdminAttributesNoPw{
    password: string;
}

export interface AdminTypeInput extends Optional<AdminAttributes, 'id'> {}
export interface AdminTypeOutput extends Required<AdminAttributesNoPw> {}
export interface AdminTypeOutputPw extends Required<AdminAttributes> {}


class Admin extends Model<AdminAttributes, AdminTypeInput> implements AdminAttributes {
    public id!: number
    public name!: string
    public email!: string
    public password!: string

    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date  
    public readonly deletedAt!: Date
}

Admin.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    sequelize: sequelize,
    paranoid: true
})

export default Admin
