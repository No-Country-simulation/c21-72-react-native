import { connectionApi } from "@/config/api/connection";
import { Register } from "@/domain/entities/register";
import { Student } from "@/domain/entities/student";
import { isAxiosError } from "axios";

export const requestAccountPendient = async(student: Partial<Register>) => {
    try {
      const { data } = await connectionApi.post(`/users/parent`, {
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