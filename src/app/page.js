"use client";

import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import { GetFilmes } from "@/actions/filme";
import { GetSeries } from "@/actions/serie";
import ContentTypeButton from "@/components/ContentTypeButton";
import Section from "@/components/Section";
import AddContentModal from "@/components/AddContentModal";

export default function Home() {
  const [contentType, setContentType] = useState("movies");
  const [favoriteData, setFavoriteData] = useState([]);
  const [watchLaterData, setWatchLaterData] = useState([]);
  const [communityData, setCommunityData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let fetchedData = [];
        if (contentType === "movies") {
          fetchedData = await GetFilmes();
        } else if (contentType === "series") {
          fetchedData = await GetSeries();
        }

        setFavoriteData(fetchedData);
        setWatchLaterData(fetchedData);
        setCommunityData(fetchedData);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    fetchData();
  }, [contentType]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <NavBar active={"/"} />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <ContentTypeButton
            contentType={contentType}
            setContentType={setContentType}
          />
          <button
            onClick={handleOpenModal}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 focus:outline-none"
          >
            +
          </button>
        </div>
        <Section title="Favoritos" data={favoriteData} contentType={contentType} />
        <Section title="Para Assistir" data={watchLaterData} contentType={contentType} />
        <Section title="Comunidade" data={communityData} contentType={contentType} />
      </main>

      {isModalOpen && (
        <AddContentModal
          contentType={contentType}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
