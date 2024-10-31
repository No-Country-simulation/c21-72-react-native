import { connectionApi } from "@/config/api/connection";
import { Register } from "@/domain/entities/register";
import { isAxiosError } from "axios";

export const createAccountPendient = async(student: Partial<Register>) => {
    try {
      const { data } = await connectionApi.post(`/users/parentcreate`, {
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