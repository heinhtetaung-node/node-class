import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from './index';

interface StudentAttributes {
    id: number,
    name : string,
    age : number,
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface StudentTypeInput extends Optional<StudentAttributes, 'id'> {}
export interface StudentTypeOutput extends Required<StudentAttributes> {}

class Student extends Model<StudentAttributes, StudentTypeInput> implements StudentAttributes {
    public id!: number
    public name!: string
    public age!: number
    
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;  
    public readonly deletedAt!: Date;  
}

Student.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
}, {
    timestamps: true,
    sequelize: sequelize,
    paranoid: true
})

export default Student
