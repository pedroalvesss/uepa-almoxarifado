import { useQuery } from "@tanstack/react-query";
import {
  getMovimentacaoList,
  getProdutosList,
} from "@/services/produtos-service";
import { QUERY_KEYS } from "../utils";
import {
  UniversalListParams,
  ProdutosListResponse,
  MovimentacaoListResponse,
} from "@/types/index";
import { getUserList } from "@/services/user-service";
import { UserListResponse } from "@/types/userAuth";

export function useProdutosListQuery(
  filters: UniversalListParams,
  options?: Omit<Parameters<typeof useQuery>[1], "queryKey" | "queryFn">
) {
  return useQuery<ProdutosListResponse, Error>({
    queryKey: [QUERY_KEYS.PRODUTOS.LIST, filters],
    queryFn: () => getProdutosList(filters),
    ...options,
  });
}

export function useUserListQuery(
  filters: UniversalListParams,
  options?: Omit<Parameters<typeof useQuery>[1], "queryKey" | "queryFn">
) {
  return useQuery<UserListResponse, Error>({
    queryKey: [QUERY_KEYS.USER.LIST, filters],
    queryFn: () => getUserList(filters),
    ...options,
  });
}

export function useMovimentacaoListQuery(
  filters: UniversalListParams,
  options?: Omit<Parameters<typeof useQuery>[1], "queryKey" | "queryFn">
) {
  return useQuery<MovimentacaoListResponse, Error>({
    queryKey: [QUERY_KEYS.MOVIMENTACOES.LIST, filters],
    queryFn: () => getMovimentacaoList(filters),
    ...options,
  });
}
