import { create } from "zustand";

import { User } from "@/domain/entities/user";
import { AuthStatus } from "@/infraestructure/interfaces/auth.status";
import { authCheckStatus, authLogin } from "@/actions/auth/auth";
import { StorageAdapter } from "@/config/adapters/storage-adapters";

export interface AuthState {
  status: AuthStatus;
  access_token?: string;
  refresh_token?: string;
  user?: User;

  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: "checking",
  access_token: undefined,
  refresh_token: undefined,
  user: undefined,

  login: async (email: string, password: string) => {
    const resp = await authLogin(email, password);
    if (!resp) {
      set({
        status: "unauthenticated",
        access_token: undefined,
        refresh_token: undefined,
        user: undefined,
      });
      return false;
    }

    await StorageAdapter.setItem("access_token", resp.access_token);
    await StorageAdapter.setItem("refresh_token", resp.refresh_token);

    const tok = await StorageAdapter.getItem("token");

    set({
      status: "authenticated",
      access_token: resp.access_token,
      refresh_token: resp.refresh_token,
      user: resp.user,
    });
    return true;
  },

  checkStatus: async () => {
    try {
      const resp = await authCheckStatus();
      if (!resp) {
        set({
          status: "unauthenticated",
          access_token: undefined,
          refresh_token: undefined,
          user: undefined,
        });
        return;
      }
      set({
        status: "authenticated",
        access_token: resp.access_token,
        refresh_token: resp.refresh_token,
        user: resp.user,
      });
    } catch (error) {
      set({
        status: "unauthenticated",
        access_token: undefined,
        refresh_token: undefined,
        user: undefined,
      });
    }
  },
}));
