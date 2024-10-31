import { connectionApi } from '@/config/api/connection';
import { Family } from '@/domain/entities/student';
import { Teacher } from '@/domain/entities/teacher';
import { isAxiosError } from 'axios';




export const createStudent = async(student: Partial<Family>) => {
  try {
    const { data } = await connectionApi.post(`/student`, {
        ...student
    });

    return data;
    
  } catch (error) {
    if ( isAxiosError(error) ) {
      console.log(error.response?.data);
    }
    
    throw new Error('Error al actualizar el profesor');
  }
}