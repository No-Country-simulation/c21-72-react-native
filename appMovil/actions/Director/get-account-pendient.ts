import { connectionApi } from "@/config/api/connection"
import { Person } from "@/domain/entities/person";
import { Student } from "@/domain/entities/student";
import { StudentResponse } from "@/infraestructure/interfaces/student.response";
import { PersonResponse } from "@/infraestructure/interfaces/teacher.response";
import { PersonMapper } from "@/infraestructure/mappers/person.mapper";
import { StudentMapper } from "@/infraestructure/mappers/student.mapper";



export const getPersonAccountByPage = async (page: number, limit: number = 10): Promise<Person[]> =>{
    try {
        const {data} = await connectionApi.get<PersonResponse[]>(`/director/account_family?offset=${page * 10}&limit=${limit}`)
        const persons = data.map(PersonMapper.responsePersonToEntity);
        return persons;
    } catch (error) {
        console.log(error)
        throw new Error('Error getting persons')
    }
}

export const getStudentAccountByPage = async (page: number, limit: number = 10): Promise<Student[]> =>{
    try {
        const {data} = await connectionApi.get<StudentResponse[]>(`/director/account_student?offset=${page * 10}&limit=${limit}`)
        const students = data.map(StudentMapper.responseStudentToEntity);
        return students;
    } catch (error) {
        console.log(error)
        throw new Error('Error getting persons')
    }
}