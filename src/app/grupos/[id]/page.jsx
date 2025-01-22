import { PrismaClient } from "@prisma/client";
import { Undo2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";


const prisma = new PrismaClient();

async function PaginaGrupo({ params }) {
  return (
    <div className="container mx-auto p-4">
      <Link className="flex gap-3 items-center text-blue-500 hover:text-blue-700" href="/grupos">
        <Undo2 /> <b>IR ATRAS</b>
      </Link>
      <Suspense fallback={<div className="skeleton h-32 w-full mt-4">CARGANDO DATOS DEL GRUPO</div>}>
        <Lista params={params} />
      </Suspense>
    </div>
  );
}

export default PaginaGrupo;

async function Lista({ params }) {
  const { id } = params;
  const grupo = await prisma.grupo.findUnique({ where: { id: +id } });
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Grupo con Id {grupo.id}</h1>
      <p className="text-lg text-gray-600 mb-2"><span className="font-semibold">Nombre:</span> {grupo.nombre}</p>
      <p className="text-lg text-gray-600 mb-2"><span className="font-semibold">Tutor:</span> {grupo.tutor}</p>
      <p className="text-lg text-gray-600"><span className="font-semibold">Aula:</span> {grupo.aula}</p>
    </div>
  );
}
