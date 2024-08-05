export interface JoinData {
    nickname: string;
    email: string;
    password: string;
  }

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
    accessToken: string;
    message: string;
  }