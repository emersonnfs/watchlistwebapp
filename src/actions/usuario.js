"use server";

import { cookies } from "next/headers";

export async function RegistarUsuario(usuario) {
  const url = "https://watchlist-production-b267.up.railway.app/";
  try {
    const response = await fetch(url + "api/registrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    if (!response.status === 201) {
      throw new Error("Não foi possível cadastrar o usuário");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao cadastrar o usuário:", error);
    throw error;
  }
}

export async function LoginUsuario(usuario) {
  const url = "https://watchlist-production-b267.up.railway.app/";
  const response = await fetch(url + "api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  });

  if (!response.ok) return { error: "credenciais inválidas" };

  const data = await response.json();
  localStorage.setItem("usuario", JSON.stringify(data.usuario));
  const token = data.token;
  cookies().set("token", token, {
    maxAge: 60 * 60 * 24 * 2,
  });
}

export async function LogoutUsuario() {
  cookies.remove("token");
  localStorage.removeItem("usuario");
  window.location.href = "/login";
}
