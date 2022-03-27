import Admin, {AdminTypeOutput, AdminTypeInput} from '../Models/Admin.model'

export const findAllAdmin = () : Promise<AdminTypeOutput[]> => {
    return Admin.findAll()
}

export const createAdmin = async (admin: AdminTypeInput) : Promise<AdminTypeOutput> => {
    const adminObj = await Admin.create(admin)
    return adminObj
}

export const updateAdmin = async(admin: AdminTypeInput) : Promise<AdminTypeOutput | false> => {
    const id = admin.id as number
    const adminUpdate = await Admin.findByPk(id)
    if (!adminUpdate) {
        return false
    }

    const updateAdmin = await (adminUpdate as Admin).update(admin)
    return updateAdmin
}

export const getAdminByEmail = (email: string) : Promise<AdminTypeOutput | null> => {
    return Admin.findOne({ where: { email } })
}
