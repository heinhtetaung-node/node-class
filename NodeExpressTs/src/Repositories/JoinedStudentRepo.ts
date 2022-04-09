import Class from '../Models/Class.model'
import Course, { CoursesTypeOutput } from '../Models/Courses.model'
import JoinedStudent, { JoinedStudentTypeInput, JoinedStudentTypeOutput } from '../Models/JoinedStudent.model'
import Student, { StudentTypeOutput } from '../Models/Student.model'
import Teacher, { TeacherTypeOutput } from '../Models/Teacher.model'

export const allJoinedStudent = () : Promise<JoinedStudentTypeOutput[]> => {
    return JoinedStudent.findAll()
}

export const createJoinedStudent = (joinedstudent : JoinedStudentTypeInput) : Promise<JoinedStudentTypeOutput> => {
    return JoinedStudent.create(joinedstudent)    
} 

export const updateJoinedStudent = async(joinedstudent: JoinedStudentTypeInput) : Promise<JoinedStudentTypeOutput | false> => {
    const id = joinedstudent.id as number
    const result = await JoinedStudent.findByPk(id)

    if (!result) {
        return false
    }

    const results = await (result as JoinedStudent).update(joinedstudent)
    return results
}

export const deleteJoinedStudent = async (id: number) : Promise<boolean> => {
    const result = await JoinedStudent.findByPk(id)
    if (result === null) {
        return false
    }
    await (result as JoinedStudent).destroy()
    return true
}


export interface GetJoinStudentsClass {
    teacher_id: number;
    course_id: number;
    teacher: TeacherTypeOutput
    course: CoursesTypeOutput
}
export interface GetJoinStudents {
    id: number;
    student_id: number;
    class_id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    Student: StudentTypeOutput;
    Class: GetJoinStudentsClass;
}

export const getJoinStudents = async () : Promise<any> => {
    return await JoinedStudent.findAll({
        include : [
            {
                model: Student,
                attributes: ['name', 'age'],
                as: "Student"
            },
            {
                model: Class,
                attributes: ['teacher_id', 'course_id'],
                as: "Class",
                include : [
                    {
                        model : Teacher,
                        attributes : ['teacherfees', 'name', 'qualitification'],
                        as : "teacher"
                    },
                    {
                        model : Course,
                        attributes : ['fees', 'coursename', 'courseduration'],
                        as : "course"
                    }
                ]
            }
        ]
    });
}