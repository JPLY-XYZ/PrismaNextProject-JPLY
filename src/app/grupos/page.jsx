import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { Suspense } from "react";

const prisma = new PrismaClient();

async function PaginaGrupos() {
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
      <Lista />
    </Suspense>
  );
}

export default PaginaGrupos;

async function Lista() {
  const grupos = await prisma.grupo.findMany();

  console.log(grupos);

  return (
    <div>
      <Link href="/">
        <b>HOME</b>
      </Link>
      {grupos.map((grupo) => (
        <div className="flex gap-2" key={grupo.id}>
          <p>
            <b>Nombre: </b>
            {grupo.nombre}
          </p>
          <p>
            <b>Tutor: </b>
            {grupo.tutor}
          </p>
          <p>
            <b>Aula: </b>
            {grupo.aula}
          </p>
          <p>
            <Link href={`/grupos/${grupo.id}`}>VER</Link>
          </p>
        </div>
      ))}
    </div>
  );
}
