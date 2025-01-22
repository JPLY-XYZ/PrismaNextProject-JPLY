import { PrismaClient } from "@prisma/client";
import { Home, MessageSquareShare } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const prisma = new PrismaClient();

async function PaginaEstudiantes() {
  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <Link className="flex gap-3 m-auto text-blue-500 hover:text-blue-700" href="/">
        <Home /> <b>IR AL INICIO</b>
      </Link>
      <Suspense fallback={<div className="skeleton h-32 mt-10 w-full text-center">CARGANDO DATOS DE LOS ESTUDIANTES</div>}>
        <Lista />
      </Suspense>
    </div>
  );
}

export default PaginaEstudiantes;

async function Lista() {
  const estudiantes = await prisma.alumno.findMany();

  return (
    <table className="table-auto w-full mt-5 border-collapse border shadow-lg">
      <thead>
        <tr>
          <th className="px-4 py-2 border">Nombre</th>
          <th className="px-4 py-2 border">Fecha de Nacimiento</th>
          <th className="px-4 py-2 border">Tutor Legal</th>
          <th className="px-4 py-2 border">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {estudiantes.map((estudiante) => (
          <tr key={estudiante.id} className="border hover:bg-purple-500">
            <td className="border px-4 py-2">{estudiante.nombre}</td>
            <td className="border px-4 py-2">{new Date(estudiante.fechaNacimiento).toLocaleDateString()}</td>
            <td className="border px-4 py-2">{estudiante.tutorLegal}</td>
            <td className="border px-4 py-2 text-center">
              <Link className="flex gap-3 justify-center text-blue-500 hover:text-black" href={`/estudiantes/${estudiante.id}`}>
                VER <MessageSquareShare />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
