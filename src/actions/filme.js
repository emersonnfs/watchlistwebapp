"use server";

import { revalidatePath } from "next/cache";
import { cookies } from 'next/headers'

export async function GetFilmes(usuarioId) {
  const url = "https://watchlist-production-b267.up.railway.app/";
  try {
    const response = await fetch(
      `${url}api/filme?size=100&userId=${usuarioId}`,{
        headers: {
          "Authorization": `Bearer ${cookies().get("token")}`
        }
      }
    );
    if (!response.ok) {
      throw new Error("Não foi possível carregar os dados");
    }
    const data = await response.json();
    return data._embedded.entityModelList;
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
    throw error;
  }
}

export async function PostFilme(filme) {
  const url = "https://watchlist-production-b267.up.railway.app/";
  try {
    const response = await fetch(url + "api/filme", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cookies().get("token")}`
      },
      body: JSON.stringify(filme),
    });
    if (!response.status === 201) {
      throw new Error("Não foi possível cadastrar o filme");
    }
    revalidatePath("/");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao cadastrar o filme:", error);
    throw error;
  }
}

export async function DeleteFilme(filme) {
  const url = "https://watchlist-production-b267.up.railway.app/";
  try {
    const response = await fetch(url + "api/filme/" + filme.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cookies().get("token")}`
      },
      body: JSON.stringify(filme),
    });
    if (response.status === 204) {
      revalidatePath("/");
      return "Filme deletado com sucesso";
    } else {
      throw new Error("Não foi possível deletar o filme");
    }
  } catch (error) {
    console.error("Erro ao deletar o filme:", error);
    throw error;
  }
}

export async function PutFilme(filme) {
  const url = "https://watchlist-production-b267.up.railway.app/";
  try {
    const response = await fetch(url + "api/filme/" + filme.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cookies().get("token")} `
      },
      body: JSON.stringify(filme),
    });
    if (!response.status === 200) {
      throw new Error("Não foi possível atualizar o filme");
    }
    revalidatePath("/");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao atualizar o filme:", error);
    throw error;
  }
}

export async function GetFilmeById(id) {
  const url = "https://watchlist-production-b267.up.railway.app/";
  try {
    const response = await fetch(url + "api/filme/" + id,{
      headers: {
        "Authorization": `Bearer ${cookies().get("token")}`
      }
    });
    if (!response.ok) {
      throw new Error("Não foi possível carregar os dados");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
    throw error;
  }
}
