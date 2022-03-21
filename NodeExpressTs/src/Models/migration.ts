import { sequelize } from './index';
import Student from "./Student.model"

export const migrate = async () => {
    await Student.sync()
};