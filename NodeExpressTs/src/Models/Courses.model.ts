import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from './index'

interface CoursesAttributes {
    id: number
    fees: number
    coursename: string
    courseduration: string
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export interface CoursesTypeInput extends Optional<CoursesAttributes, 'id'> {}
export interface CoursesTypeOutput extends Required<CoursesAttributes> {}

class Course extends Model<CoursesAttributes, CoursesTypeInput> implements CoursesAttributes {
    public id!: number
    public fees!: number
    public coursename!: string
    public courseduration!: string

    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date  
    public readonly deletedAt!: Date
}

Course.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    fees: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    coursename: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    courseduration: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    timestamps: true,
    sequelize: sequelize,
    paranoid: true
})

export default Course