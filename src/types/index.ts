import { LucideIcon } from "lucide-react";
import { UsuarioCadastro } from "./userAuth";

// Tratamento de erro
export type ErrorResponse = {
  error: string;
};

export type CreateUserResult = UsuarioCadastro | ErrorResponse;

// API Produtos
export type Produto = {
  id: number;
  nome: string;
  descricao: string;
  qntd_estoq: number;
};

export type ProdutoRequestParams = Omit<Produto, "id">;

export type ProdutosListResponse = {
  results: Produto[];
  page: {
    total_pages: number;
    total_items: number;
    next: string;
    previous: string;
  };
};

export type UniversalListParams = {
  search?: string;
  page?: number;
  limit?: number;
};

export type Movimentacao = {
  id: number;
  produtoid: number;
  produtonome: string;
  tipo: string;
  quantidade: number;
  datamovimentacao: Date;
};

export type MovimentacaoListResponse = {
  results: Movimentacao[];
  page: {
    total_pages: number;
    total_items: number;
    next: string;
    previous: string;
  };
};

// Funcionalidades
export interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

export interface DataTableFilterField<TData> {
  label: string;
  value: keyof TData;
  placeholder?: string;
  options?: Option[];
}

export interface DataTableFilterOption<TData> {
  id: string;
  label: string;
  value: keyof TData;
  options: Option[];
  filterValues?: string[];
  filterOperator?: string;
  isMulti?: boolean;
}

// sidebar

export interface ItemNavbar {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: ItemNavbar[];
}
