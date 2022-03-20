import { db, sequelize } from './index';
import Student from "./Student.model"

(async () => {
    await sequelize.sync();
    console.log(Student)
})();

export default db