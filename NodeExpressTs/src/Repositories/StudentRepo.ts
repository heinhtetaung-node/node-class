import Student, { StudentTypeOutput, StudentTypeInput } from "../Models/Student.model";

export const findAllStudents = () : Promise<StudentTypeOutput[]> => {
    return Student.findAll();
}

export const createStudent = (student : StudentTypeInput) : Promise<StudentTypeOutput> => {
    return Student.create(student)    
} 

export const getStudentDetail = (id : number) : Promise<StudentTypeOutput | null> => {
    return Student.findByPk(id)
}

export const updateStudent = async (student : StudentTypeInput) : Promise<StudentTypeOutput | false> => {
    const id = student.id as number
    const studentUpdate = await Student.findByPk(id)
    if (studentUpdate === null) {
        return false
    }
    const updatedStudent = await (studentUpdate as Student).update(student)
    return updatedStudent;
} 