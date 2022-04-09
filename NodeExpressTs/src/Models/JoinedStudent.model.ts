import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from './index'

interface JoinedStudentAttributes {
    id: number
    student_id: number
    class_id: number
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export interface JoinedStudentTypeInput extends Optional<JoinedStudentAttributes, 'id'> {}
export interface JoinedStudentTypeOutput extends Required<JoinedStudentAttributes> {}

class JoinedStudent extends Model<JoinedStudentAttributes, JoinedStudentTypeInput> implements JoinedStudentAttributes{
    public id!: number
    public student_id!: number
    public class_id!: number

    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date  
    public readonly deletedAt!: Date
}

JoinedStudent.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    class_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: true,
    sequelize: sequelize,
    paranoid: true
})

export default JoinedStudent