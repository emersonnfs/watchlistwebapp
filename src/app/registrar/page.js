"use client";
import React, { useState } from "react";
import { RegistarUsuario } from "@/actions/usuario";

export default function Registrar() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await RegistarUsuario({ nome, email, senha });
    } catch (error) {
      alert("Erro ao cadastrar o usuário:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Registro</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-3 py-2 rounded-md border focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-md border focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-3 py-2 rounded-md border focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}
