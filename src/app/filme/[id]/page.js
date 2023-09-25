"use client";

import { GetFilmeById, PutFilme, DeleteFilme } from "@/actions/filme";
import Details from "@/components/Details";

export default function FilmeDetails({ params }) {
  return (
    <Details
      params={params}
      getData={GetFilmeById}
      updateData={PutFilme}
      deleteData={DeleteFilme}
    />
  );
}
