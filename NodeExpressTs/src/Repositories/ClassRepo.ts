import Class, { ClassTypeInput, ClassTypeOutput } from "../Models/Class.model"

export const allClass = () : Promise<ClassTypeOutput[]> => {
    return Class.findAll()
}

export const createClass = (classes : ClassTypeInput) : Promise<ClassTypeOutput> => {
    return Class.create(classes)    
} 

export const updateClass = async(classes: ClassTypeInput) : Promise<ClassTypeOutput | false> => {
    const id = classes.id as number
    const result = await Class.findByPk(id)

    if (!result) {
        return false
    }

    const results = await (result as Class).update(classes)
    return results
}

export const deleteClass = async (id: number) : Promise<boolean> => {
    const result = await Class.findByPk(id)
    if (result === null) {
        return false
    }
    await (result as Class).destroy()
    return true
}