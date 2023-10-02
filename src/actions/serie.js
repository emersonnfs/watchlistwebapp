"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function GetSeries(usuarioId) {
  const url = "https://watchlist-production-b267.up.railway.app/";
  try {
    const response = await fetch(
      `${url}api/serie?size=100&userId=${usuarioId}`,{
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

export async function PostSerie(serie) {
  const url = "https://watchlist-production-b267.up.railway.app/";
  try {
    const response = await fetch(url + "api/serie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cookies().get("token")} `
      },
      body: JSON.stringify(serie),
    });
    if (!response.status === 200) {
      throw new Error("Não foi possível cadastrar a série");
    }
    revalidatePath("/");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao cadastrar a série:", error);
    throw error;
  }
}

export async function DeleteSerie(serie) {
  const url = "https://watchlist-production-b267.up.railway.app/";
  try {
    const response = await fetch(url + "api/serie/" + serie.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cookies().get("token")} `
      },
      body: JSON.stringify(serie),
    });

    if (response.status === 204) {
      revalidatePath("/");
      return "Série deletada com sucesso";
    } else {
      throw new Error("Não foi possível deletar a série");
    }
  } catch (error) {
    console.error("Erro ao deletar a série:", error);
    throw error;
  }
}

export async function PutSerie(serie) {
  const url = "https://watchlist-production-b267.up.railway.app/";
  try {
    const response = await fetch(url + "api/serie/" + serie.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cookies().get("token")} `
      },
      body: JSON.stringify(serie),
    });
    if (!response.status === 201) {
      throw new Error("Não foi possível atualizar a série");
    }
    revalidatePath("/");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao atualizar a série:", error);
    throw error;
  }
}

export async function GetSerieById(id) {
  const url = "https://watchlist-production-b267.up.railway.app/";
  try {
    const response = await fetch(url + "api/serie/" + id,{
      headers: {
        "Authorization": `Bearer ${cookies().get("token")} `
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
