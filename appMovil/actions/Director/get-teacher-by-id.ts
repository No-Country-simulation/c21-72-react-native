import { connectionApi } from "@/config/api/connection";
import { Teacher } from "@/domain/entities/teacher";
import { TeacherResponse } from "@/infrastructure/interfaces/teacher.response";
import { TeacherMapper } from "@/infrastructure/mappers/teacher.mapper";

const emptyTeacher: Teacher = {
  id: '',
  personId: '',
  full_name: '',
  last_name: '',
  male: '',
  email_address: '',
  address:'',
  title: 'Nuevo profesor',
}

export const getTeacherById = async (id: string):Promise<Teacher> => {
  if ( id === 'new' ) return emptyTeacher;

  try {
    const { data } = await connectionApi.get<TeacherResponse>(`/teacher/${id}`);
    return TeacherMapper.responseTeacherToEntity(data);

  } catch (error) {
    console.log(error);
    throw new Error(`Error getting teacher by id: ${ id }`);
  }
}