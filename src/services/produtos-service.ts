import {
  Produto,
  ProdutoRequestParams,
  UniversalListParams,
  ProdutosListResponse,
  ErrorResponse,
  MovimentacaoListResponse,
} from "@/types/index";

export async function getProdutosList(
  params: UniversalListParams
): Promise<ProdutosListResponse> {
  const query = new URLSearchParams();

  if (params.search) query.append("search", params.search);
  if (params.page) query.append("page", String(params.page));
  if (params.limit) query.append("limit", String(params.limit));

  const url = `https://api-estoque-7wp0.onrender.com/produtos?${query.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar produtos: ${response.status}`);
  }

  const data = (await response.json()) as ProdutosListResponse;
  return data;
}

export async function getMovimentacaoList(
  params: UniversalListParams
): Promise<MovimentacaoListResponse> {
  const query = new URLSearchParams();

  if (params.search) query.append("search", params.search);
  if (params.page) query.append("page", String(params.page));
  if (params.limit) query.append("limit", String(params.limit));

  const url = `https://api-estoque-7wp0.onrender.com/movimentacoes?${query.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar movimentacoes: ${response.status}`);
  }

  const data = (await response.json()) as MovimentacaoListResponse;
  return data;
}

export async function getProduto(): Promise<Produto> {
  const url = `https://api-estoque-7wp0.onrender.com/produtos/`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar produtos: ${response.status}`);
  }

  const data = (await response.json()) as Produto;
  return data;
}

export async function createProduto(
  data: ProdutoRequestParams | ErrorResponse
): Promise<Produto> {
  const response = await fetch(
    "https://api-estoque-7wp0.onrender.com/produtos",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error(`Erro ao cadastrar produto: ${response.status}`);
  }

  return await response.json();
}

export async function updateProduto(
  id: number,
  data: ProdutoRequestParams | ErrorResponse
): Promise<Produto> {
  const response = await fetch(
    `https://api-estoque-7wp0.onrender.com/produtos/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error(`Erro ao atualizar produto: ${response.status}`);
  }

  return await response.json();
}

export async function deleteProduto(
  id: number | ErrorResponse
): Promise<Produto> {
  const response = await fetch(
    `https://api-estoque-7wp0.onrender.com/produtos/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error(`Erro ao deletar produto: ${response.status}`);
  }

  return await response.json();
}
