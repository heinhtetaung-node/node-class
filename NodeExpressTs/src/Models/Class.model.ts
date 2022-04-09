import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from './index'

interface ClassAttributes {
    id: number
    teacher_id: number
    course_id: number
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export interface ClassTypeInput extends Optional<ClassAttributes, 'id'> {}
export interface ClassTypeOutput extends Required<ClassAttributes> {}

class Class extends Model<ClassAttributes, ClassTypeInput> implements ClassAttributes{
    public id!: number
    public teacher_id!: number
    public course_id!: number

    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date  
    public readonly deletedAt!: Date
}

Class.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    teacher_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: true,
    sequelize: sequelize,
    paranoid: true
})

export default Class