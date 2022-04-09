import Class from './Class.model';
import Course from './Courses.model';
import { sequelize } from './index';
import JoinedStudent from './JoinedStudent.model';
import Student from './Student.model';
import Teacher from './Teacher.model';

export const migrate = async () => {    

    await sequelize.sync();

    Class.belongsTo(Course, {as : 'course', foreignKey : 'course_id'})
    Class.belongsTo(Teacher, {as : 'teacher', foreignKey : 'teacher_id'})
    Teacher.hasMany(Class, {as : 'class', foreignKey : 'teacher_id'})
    JoinedStudent.belongsTo(Student,  {as: 'Student', foreignKey: 'student_id'});
    JoinedStudent.belongsTo(Class, {as: 'Class', foreignKey: 'class_id'});
    
}