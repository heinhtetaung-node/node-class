import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from './index'

export interface TeacherAttributes {
    id: number
    teacherfees: number
    name: string
    qualitification: string
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export interface TeacherTypeInput extends Optional<TeacherAttributes, 'id'> {}
export interface TeacherTypeOutput extends Required<TeacherAttributes> {}

class Teacher extends Model<TeacherAttributes, TeacherTypeInput> implements TeacherAttributes{
    public id!: number
    public teacherfees!: number
    public name!: string
    public qualitification!: string

    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date  
    public readonly deletedAt!: Date
}

Teacher.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    teacherfees: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    qualitification: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    timestamps: true,
    sequelize: sequelize,
    paranoid: true
})

export default Teacher