import { connectionApi } from "@/config/api/connection";
import { User } from "@/domain/entities/user";
import type { AuthResponse } from "@/infraestructure/interfaces/auth.responses";

const returnUserToken = (data: AuthResponse) => {
  const user: User = {
    email: data.email,
  };

  return {
    user: user,
    access_token: data.access_token,
    refresh_token: data.refresh_token,
  };
};

export const authLogin = async (email: string, password: string) => {
  try {
    const { data } = await connectionApi.post<AuthResponse>("/auth/login", {
      email,
      password,
    });

    return returnUserToken(data);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const authCheckStatus = async () => {
  try {
    const { data } = await connectionApi.get<AuthResponse>("/auth/verify");
    return returnUserToken(data);
  } catch (error) {
    console.log(error);
    return null;
  }
};
