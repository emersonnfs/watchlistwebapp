"use client";

import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import { GetFilmes } from "@/actions/filme";
import { GetSeries } from "@/actions/serie";
import ContentTypeButton from "@/components/ContentTypeButton";
import Section from "@/components/Section";

export default function Home() {
  const [contentType, setContentType] = useState("movies");
  const [favoriteData, setFavoriteData] = useState([]);
  const [watchLaterData, setWatchLaterData] = useState([]);
  const [communityData, setCommunityData] = useState([]);

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

  return (
    <div>
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <ContentTypeButton
          contentType={contentType}
          setContentType={setContentType}
        />
        <Section title="Favoritos" data={favoriteData} />

        <Section title="Para Assistir" data={watchLaterData} />

        <Section title="Comunidade" data={communityData} />
      </main>
    </div>
  );
}
