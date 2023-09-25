"use server";

import { revalidatePath } from "next/cache";

export async function GetSeries() {
  const url = "https://watchlist-production-b267.up.railway.app/";
  try {
    const response = await fetch(
      url + "api/serie?size=100" /*, { next: { revalidate: 3600 } }*/
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
      },
      body: JSON.stringify(serie),
    });
    if (!response.status === 200) {
      throw new Error("Não foi possível cadastrar a série");
    }
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
      },
      body: JSON.stringify(serie),
    });
    if (!response.status === 201) {
      throw new Error("Não foi possível deletar a série");
    }
    const data = await response.json();
    return data;
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
      },
      body: JSON.stringify(serie),
    });
    if (!response.status === 201) {
      throw new Error("Não foi possível atualizar a série");
    }
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
    const response = await fetch(url + "api/serie/" + id);
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
