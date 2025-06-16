import { ErrorResponse } from ".";

export type CreateUserResult = UsuarioCadastro | ErrorResponse;

export type Usuario = {
  id: number;
  tipo: "usuario" | "administrador";
  nome: string;
};

export type UserListResponse = {
  results: ExporUsuario[];
  page: {
    total_pages: number;
    total_items: number;
    next: string;
    previous: string;
  };
};

export type UsuarioLogin = {
  email: string;
  password: string;
};

export type EditUserParams = {
  email: string;
  name: string;
};

export type LoginResponse = {
  message: string;
  token: string;
  usuario: Usuario;
};

export type UsuarioCadastro = UsuarioLogin & {
  name: string;
};

export type ExporUsuario = {
  id: string;
  name: string;
  type: string;
  email: string;
};
