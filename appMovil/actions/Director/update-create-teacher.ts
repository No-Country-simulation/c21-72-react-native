import { connectionApi } from '@/config/api/connection';
import { Teacher } from '@/domain/entities/teacher';
import { isAxiosError } from 'axios';


export const updateCreateTeacher = ( teacher: Partial<Teacher> ) => {
  if ( teacher.id && teacher.id !== 'new') {
    return updateTeacher(teacher);
  }

  return createTeacher( teacher );
}

const updateTeacher = async (teacher: Partial<Teacher>) => {
  const { id, ...rest  } = teacher;

  try {
    const { data } = await connectionApi.patch(`/teacher/${id}`, {
      ...rest
    })

    return data;
    
  } catch (error) {

    if ( isAxiosError(error) ) {
      console.log(error.response?.data);
    }
    
    throw new Error('Error al actualizar el profesor');
  }
}

const createTeacher = async(teacher: Partial<Teacher>) => {
  const { id, ...rest  } = teacher;

  try {
    const { data } = await connectionApi.post(`/person`, {
      ...rest
    });

    return data;
    
  } catch (error) {
    if ( isAxiosError(error) ) {
      console.log(error.response?.data);
    }
    
    throw new Error('Error al actualizar el profesor');
  }
}