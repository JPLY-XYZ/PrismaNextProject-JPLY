import { PrismaClient } from "@prisma/client";
import { Undo2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";


const prisma = new PrismaClient();

async function PaginaGrupo({ params }) {
  return (
    <div className="container mx-auto p-4">
      <Link className="flex gap-3 items-center text-blue-500 hover:text-blue-700" href="/estudiantes">
        <Undo2 /> <b>IR ATRAS</b>
      </Link>
      <Suspense fallback={<div className="skeleton h-32 w-full mt-4">CARGANDO DATOS DEL ESTUDIANTE</div>}>
        <Lista params={params} />
      </Suspense>
    </div>
  );
}

export default PaginaGrupo;

async function Lista({ params }) {
  const { id } = params;
  const estudiante = await prisma.alumno.findUnique({ where: { id: +id } });
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Estudiante con Id {estudiante.id}</h1>
      <p className="text-lg text-gray-600 mb-2"><span className="font-semibold">Nombre:</span> {estudiante.nombre}</p>
      <p className="text-lg text-gray-600 mb-2"><span className="font-semibold">Fecha de Nacimiento:</span> {new Date(estudiante.fechaNacimiento).toLocaleDateString()}</p>
      {estudiante.foto && <img src={estudiante.foto} alt="Foto del estudiante" className="mt-2 rounded-lg" />}
      <p className="text-lg text-gray-600"><span className="font-semibold">Tutor Legal:</span> {estudiante.tutorLegal}</p>
    </div>
  );
}
