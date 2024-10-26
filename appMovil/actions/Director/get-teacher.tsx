import { connectionApi } from "@/config/api/connection"
import { Teacher } from "@/domain/entities/teacher"
import { TeacherResponse } from "@/infraestructure/interfaces/teacher.response"
import { TeacherMapper } from "@/infraestructure/mappers/teacher.mapper"

export const getTeacherByPage = async (page: number, limit: number = 10): Promise<Teacher[]> =>{
    try {
        const {data} = await connectionApi.get<TeacherResponse[]>(`/teacher?offset=${page * 10}&limit=${limit}`)
        const teachers = data.map(TeacherMapper.responseTeacherToEntity);
        return teachers;
    } catch (error) {
        console.log(error)
        throw new Error('Error getting teachers')
    }
}