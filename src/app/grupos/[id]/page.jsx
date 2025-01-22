import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { Suspense } from "react";

const prisma = new PrismaClient();

async function PaginaGrupo({ params }) {
  return (
    <Suspense
      fallback={
        <div className="animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="300"
            height="300"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 6.001h18m-18 6h18m-18 6h18"
            />
          </svg>
        </div>
      }
    >
      {" "}
      <Lista params={params} />
    </Suspense>
  );
}

export default PaginaGrupo;

async function Lista({ params }) {
  const { id } = await params;
  const grupo = await prisma.grupo.findUnique({ where: { id: +id } });
  return (
    <div>
      <Link href="/grupos">
        <b>GRUPOS</b>
      </Link>
      <h1>Grupo con Id {grupo.id}</h1>
      <p>Nombre: {grupo.nombre} </p>
      <p>Tutor: {grupo.tutor} </p>
      <p>Aula: {grupo.aula}</p>
    </div>
  );
}
