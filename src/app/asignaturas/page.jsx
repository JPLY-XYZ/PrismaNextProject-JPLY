import { PrismaClient } from "@prisma/client";
import { Home, MessageSquareShare } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const prisma = new PrismaClient();

async function PaginaAsignaturas() {
  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <Link className="flex gap-3 m-auto text-blue-500 hover:text-blue-700" href="/">
        <Home /> <b>IR AL INICIO</b>
      </Link>
      <Suspense fallback={<div className="skeleton h-60 mt-10  w-full text-center">CARGANDO DATOS DE LAS ASIGNATURAS</div>}>
        <Lista />
      </Suspense>
    </div>
  );
}

export default PaginaAsignaturas;

async function Lista() {
  const asignaturas = await prisma.asignatura.findMany();

  return (
    <table className="table-auto w-full mt-5 border-collapse border shadow-lg">
      <thead>
        <tr className="">
          <th className="px-4 py-2 border ">Nombre</th>
          <th className="px-4 py-2 border ">Profesor</th>
          <th className="px-4 py-2 border ">Horas</th>
          <th className="px-4 py-2 border ">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {asignaturas.map((asignatura) => (
          <tr key={asignatura.id} className="border hover:bg-purple-500">
            <td className="border px-4 py-2">{asignatura.nombre}</td>
            <td className="border px-4 py-2">{asignatura.profesor}</td>
            <td className="border px-4 py-2">{asignatura.horas}</td>
            <td className="border px-4 py-2 text-center">
              <Link className="flex gap-3 justify-center text-blue-500 hover:text-black" href={`/asignaturas/${asignatura.id}`}>
                VER <MessageSquareShare />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
