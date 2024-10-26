import {create} from 'zustand';

import { User } from "@/domain/entities/user";
import { authCheckStatus, authLogin } from '@/actions/auth/auth';
import { StorageAdapter } from '@/config/adapters/storage-adapter';
import { AuthStatus } from '@/infraestructure/interfaces/auth.status';


export enum Role {
  DIRECTOR = "director", // Director
  TEACHER = 'profesor',
  STUDENT = 'estudiante',
  PARENT = 'padre'
}

export interface AuthState{
  status:AuthStatus;
  access_token?:string;
  refresh_token?:string;
  user?:User;
  rol?:string;

  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
}


export const useAuthStore = create<AuthState>()((set,get) => ({
  status:'checking',
  access_token:undefined,
  refresh_token:undefined,
  user:undefined,
  rol: undefined,

  login: async (email:string, password: string) => {
    const resp = await authLogin(email, password);
    if(!resp){
      set({status:'unauthenticated', access_token:undefined, refresh_token:undefined, user:undefined, rol:undefined})
      return false;
    }

    await StorageAdapter.setItem('access_token', resp.access_token)
    await StorageAdapter.setItem('refresh_token', resp.refresh_token)
    await StorageAdapter.setItem('userRole', resp.rol);

    const tok = await StorageAdapter.getItem('token')
    
    set({status:'authenticated', access_token: resp.access_token, refresh_token: resp.refresh_token, user:resp.user, rol: resp.rol})
    return true;
  },

  checkStatus: async () => {
    try {
      const resp = await authCheckStatus();
      if (!resp) {
        set({ status: 'unauthenticated', access_token: undefined, refresh_token: undefined, user: undefined, rol: undefined });
        return;
      }
      set({ status: 'authenticated', access_token: resp.access_token, refresh_token: resp.refresh_token, user: resp.user, rol: resp.rol });
    } catch (error) {
      set({ status: 'unauthenticated', access_token: undefined, refresh_token: undefined, user: undefined, rol: undefined });
    }
  },
  logout: async () => {
    await StorageAdapter.removeItem('access_token')
    await StorageAdapter.removeItem('refresh_token')
    await StorageAdapter.removeItem('userRole')
    set({ status: 'unauthenticated', access_token: undefined, refresh_token: undefined, user: undefined, rol: undefined });
  }
}))
