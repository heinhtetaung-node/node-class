import Course, { CoursesTypeInput, CoursesTypeOutput } from "../Models/Courses.model"

export const allCourse = () : Promise<CoursesTypeOutput[]> => {
    return Course.findAll()
}

export const createCourse = (course : CoursesTypeInput) : Promise<CoursesTypeOutput> => {
    return Course.create(course)    
} 

export const updateCourse = async(course: CoursesTypeInput) : Promise<CoursesTypeOutput | false> => {
    const id = course.id as number
    const result = await Course.findByPk(id)

    if (!result) {
        return false
    }

    const results = await (result as Course).update(course)
    return results
}

export const deleteCourse = async (id: number) : Promise<boolean> => {
    const result = await Course.findByPk(id)
    if (result === null) {
        return false
    }
    await (result as Course).destroy()
    return true
}