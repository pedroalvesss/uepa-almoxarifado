import { ErrorResponse, UniversalListParams } from "@/types/index";
import {
  CreateUserResult,
  EditUserParams,
  ExporUsuario,
  LoginResponse,
  UserListResponse,
  UsuarioCadastro,
  UsuarioLogin,
} from "@/types/userAuth";

export async function getUserList(
  params: UniversalListParams
): Promise<UserListResponse> {
  const query = new URLSearchParams();

  if (params.search) query.append("search", params.search);
  if (params.page) query.append("page", String(params.page));
  if (params.limit) query.append("limit", String(params.limit));

  const url = `https://api-estoque-7wp0.onrender.com/usuarios?${query.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao usuarios: ${response.status}`);
  }

  const data = (await response.json()) as UserListResponse;
  return data;
}

export async function getUser(): Promise<ExporUsuario> {
  const url = `https://api-estoque-7wp0.onrender.com/usuarios/`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar produtos: ${response.status}`);
  }

  const data = (await response.json()) as ExporUsuario;
  return data;
}

export async function createUser(
  data: UsuarioCadastro
): Promise<CreateUserResult> {
  const response = await fetch(
    "https://api-estoque-7wp0.onrender.com/usuarios/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    return (await response.json()) as ErrorResponse;
  }

  return (await response.json()) as UsuarioCadastro;
}

export async function authUser(data: UsuarioLogin): Promise<LoginResponse> {
  const response = await fetch("https://api-estoque-7wp0.onrender.com/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = (await response.json()) as ErrorResponse;
    throw new Error(
      typeof errorData === "string" ? errorData : JSON.stringify(errorData)
    );
  }

  return await response.json();
}

export async function updateUser(
  id: string,
  data: EditUserParams
): Promise<EditUserParams> {
  const response = await fetch(
    `https://api-estoque-7wp0.onrender.com/usuarios/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error(`Erro ao atualizar usuario: ${response.status}`);
  }

  return await response.json();
}

export async function deleteUser(id: string): Promise<ExporUsuario> {
  const response = await fetch(
    `https://api-estoque-7wp0.onrender.com/usuarios/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error(`Erro ao usuario produto: ${response.status}`);
  }

  return await response.json();
}
