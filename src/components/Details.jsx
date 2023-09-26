import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";

export default function Details({ params, getData, updateData, deleteData }) {
  const [item, setItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [nome, setNome] = useState("");
  const [diretor, setDiretor] = useState("");
  const [duracao, setDuracao] = useState("");

  useEffect(() => {
    if (params.id) {
      getData(params.id)
        .then((data) => {
          setItem(data);
          setNome(data.nome);
          setDiretor(data.diretor);
          setDuracao(data.duracao);
        })
        .catch((error) => {
          console.error("Erro ao buscar detalhes:", error);
        });
    }
  }, [params.id, getData]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedItem = {
      ...item,
      nome,
      diretor,
      duracao,
    };

    updateData(updatedItem)
      .then(() => {
        setIsEditing(false);
        setItem(updatedItem);
      })
      .catch((error) => {
        console.error("Erro ao atualizar o item:", error);
      });
  };

  const handleDelete = () => {
    deleteData(item)
      .then(() => {
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Erro ao excluir o item:", error);
      });
  };

  if (!item) {
    return 
      <NavBar /> <div>Carregando...</div>;
  }

  return (
    <div>
      <NavBar />
      <main className="flex flex-col items-center justify-center my-3">
        <h1 className="text-2xl text-gray-700 mb-4">{item.nome}</h1>
        <div className="text-center">
          <img
            src="https://picsum.photos/300/450"
            alt="Imagem"
            className="mx-auto mb-4 rounded-lg"
          />
        </div>
        <p className="text-gray-700">Diretor: {item.diretor}</p>
        <p className="text-gray-700">Duração: {item.duracao}</p>

        {isEditing ? (
          <div className="mt-2">
            <div className="mb-2">
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="border border-gray-400 rounded-md px-2 py-1"
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                value={diretor}
                onChange={(e) => setDiretor(e.target.value)}
                className="border border-gray-400 rounded-md px-2 py-1"
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                value={duracao}
                onChange={(e) => setDuracao(e.target.value)}
                className="border border-gray-400 rounded-md px-2 py-1"
              />
            </div>
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
            >
              Salvar
            </button>
          </div>
        ) : (
          <div className="mt-2">
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
            >
              Editar
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Excluir
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
