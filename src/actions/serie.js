'use server'

import { revalidatePath } from "next/cache"

export async function GetSeries() {
  const url = 'https://watchlist-production-b267.up.railway.app/'
    try {
      const response = await fetch(url + 'api/serie?size=100', { next: { revalidate: 3600 } });
      if (!response.ok) {
        throw new Error('Não foi possível carregar os dados');
      }
      const data = await response.json();
      return data._embedded.entityModelList;
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
      throw error;
    }
  }