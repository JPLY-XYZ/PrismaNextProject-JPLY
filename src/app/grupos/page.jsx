import { PrismaClient } from "@prisma/client";
import { Home, MessageSquareShare } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const prisma = new PrismaClient();

async function PaginaGrupos() {
  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <Link className="flex gap-3 m-auto text-blue-500 hover:text-blue-700" href="/">
        <Home /> <b>IR AL INICIO</b>
      </Link>
      <Suspense fallback={<div className="skeleton h-32 w-full text-center mt-10">CARGANDO DATOS DE LOS GRUPOS</div>}>
        <Lista />
      </Suspense>
    </div>
  );
}

export default PaginaGrupos;

async function Lista() {
  const grupos = await prisma.grupo.findMany();

  return (
    <table className="table-auto w-full mt-5 border-collapse border shadow-lg">
      <thead>
        <tr>
          <th className="px-4 py-2 border">Nombre</th>
          <th className="px-4 py-2 border">Tutor</th>
          <th className="px-4 py-2 border">Aula</th>
          <th className="px-4 py-2 border">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {grupos.map((grupo) => (
          <tr key={grupo.id} className="border hover:bg-purple-500">
            <td className="border px-4 py-2">{grupo.nombre}</td>
            <td className="border px-4 py-2">{grupo.tutor}</td>
            <td className="border px-4 py-2">{grupo.aula}</td>
            <td className="border px-4 py-2 text-center">
              <Link className="flex gap-3 justify-center text-blue-500 hover:text-black" href={`/grupos/${grupo.id}`}>
                VER <MessageSquareShare />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

