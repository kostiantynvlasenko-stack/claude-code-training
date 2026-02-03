export interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
  bio?: string;
  createdAt: Date;
}

export interface Session {
  id: number;
  userId: number;
  token: string;
  expiresAt: Date;
}

export interface File {
  id: number;
  userId: number;
  filename: string;
  content?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: 'success' | 'error';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: Pick<User, 'id' | 'name' | 'role'>;
}
