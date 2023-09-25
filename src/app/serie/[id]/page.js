"use client";

import { GetSerieById, PutSerie, DeleteSerie } from "@/actions/serie";
import Details from "@/components/Details";

export default function SerieDetails({ params }) {
  return (
    <Details
      params={params}
      getData={GetSerieById}
      updateData={PutSerie}
      deleteData={DeleteSerie}
    />
  );
}
