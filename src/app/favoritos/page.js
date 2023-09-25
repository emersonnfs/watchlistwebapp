import NavBar from "@/components/NavBar";

export default function Favoritos(){
    return(
        <>
            <NavBar active={"favoritos"}/>
            <main className="container mx-auto px-4 py-8">
                <h2>Favoritos</h2>
            </main>
        </>
    )
}'use client';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { GetFilmeById, PutFilme, DeleteFilme } from '@/actions/filme';

export default function FilmeDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [filme, setFilme] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [nome, setNome] = useState('');
  const [diretor, setDiretor] = useState('');
  const [duracao, setDuracao] = useState('');

  useEffect(() => {
    if (id) {
      GetFilmeById(id)
        .then((data) => {
          setFilme(data);
          setNome(data.nome);
          setDiretor(data.diretor);
          setDuracao(data.duracao);
        })
        .catch((error) => {
          console.error('Erro ao buscar detalhes do filme:', error);
        });
    }
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedFilme = {
      ...filme,
      nome,
      diretor,
      duracao,
    };

    PutFilme(updatedFilme)
      .then(() => {
        setIsEditing(false);
        setFilme(updatedFilme);
      })
      .catch((error) => {
        console.error('Erro ao atualizar o filme:', error);
      });
  };

  const handleDelete = () => {
    DeleteFilme(filme)
      .then(() => {
        router.push('/');
      })
      .catch((error) => {
        console.error('Erro ao excluir o filme:', error);
      });
  };

  if (!filme) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>{filme.nome}</h1>
      <p>Diretor: {filme.diretor}</p>
      <p>Duração: {filme.duracao}</p>

      {isEditing ? (
        <div>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="text"
            value={diretor}
            onChange={(e) => setDiretor(e.target.value)}
          />
          <input
            type="text"
            value={duracao}
            onChange={(e) => setDuracao(e.target.value)}
          />
          <button onClick={handleSave}>Salvar</button>
        </div>
      ) : (
        <div>
          <button onClick={handleEdit}>Editar</button>
          <button onClick={handleDelete}>Excluir</button>
        </div>
      )}
    </div>
  );
}
