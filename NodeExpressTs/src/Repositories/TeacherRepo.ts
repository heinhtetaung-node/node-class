import Class from "../Models/Class.model"
import Course, { CoursesTypeOutput } from "../Models/Courses.model"
import Teacher, { TeacherTypeInput, TeacherTypeOutput } from "../Models/Teacher.model"

export const allTeacher = () : Promise<TeacherTypeOutput[]> => {
    return Teacher.findAll()
}

export const createTeacher = async(teacher : TeacherTypeInput) : Promise<TeacherTypeOutput> => {
    return await Teacher.create(teacher)    
} 

export const updateTeacher = async(teacher: TeacherTypeInput) : Promise<TeacherTypeOutput | false> => {
    const id = teacher.id as number
    const result = await Teacher.findByPk(id)

    if (!result) {
        return false
    }

    const results = await (result as Teacher).update(teacher)
    return results
}

export const deleteTeacher = async (id: number) : Promise<boolean> => {
    const result = await Teacher.findByPk(id)
    if (result === null) {
        return false
    }
    await (result as Teacher).destroy()
    return true
}

export interface GetCoursesByTeacherClass {    
    id: number;
    course: CoursesTypeOutput
}
export interface GetCoursesByTeacher {
    id: number;
    teacherfees: number;
    name: string;
    qualitification: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    class: GetCoursesByTeacherClass[];
}
export const getCoursesByTeacher = async (teacherId : number) : Promise<any> => {
    return await Teacher.findOne({
        where : { id : teacherId },
        include : [{
            model : Class, 
            attributes : ['id'],
            as : "class",
            include : [{ 
                model: Course,
                attributes: ['fees', 'coursename', 'courseduration'],
                as: "course"
            }]
        }]
    })
}