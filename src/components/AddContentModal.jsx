import React, { useState } from "react";
import { PostFilme } from "@/actions/filme";
import { PostSerie } from "@/actions/serie";

const AddContentModal = ({ contentType, isOpen, onClose }) => {
  const [nome, setNome] = useState("");
  const [diretor, setDiretor] = useState("");
  const [duracao, setDuracao] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (contentType === "movies") {
        await PostFilme({ nome, diretor, duracao, categoria_id: "1" });
      } else if (contentType === "series") {
        await PostSerie({ nome, diretor, duracao, categoria_id: "1" });
      }

      setNome("");
      setDiretor("");
      setDuracao("");

      onClose();
    } catch (error) {
      console.error("Erro ao adicionar o conteúdo:", error);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
        <div className="modal bg-white p-8 rounded-lg w-96">
          <h2 className="text-2xl font-semibold mb-4">
            {contentType === "movies" ? "Adicionar Filme" : "Adicionar Série"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="nome"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-md border"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="diretor"
                placeholder="Diretor"
                value={diretor}
                onChange={(e) => setDiretor(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-md border mt-2"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="duracao"
                placeholder="Duração"
                value={duracao}
                onChange={(e) => setDuracao(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-md border mt-2"
              />
            </div>
            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md focus:outline-none"
              >
                Close
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md ml-4 focus:outline-none"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddContentModal;
