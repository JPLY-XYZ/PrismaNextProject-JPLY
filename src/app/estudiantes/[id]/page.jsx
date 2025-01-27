import Modal from "@/components/Modal";
import { eliminarAlumno, modificarAlumno } from "@/lib/actions";
import { PrismaClient } from "@prisma/client";
import { CopyPlus, Trash2, Undo2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const prisma = new PrismaClient();

async function PaginaGrupo({ params }) {
  return (
    <div className="container mx-auto p-4">
      <Link
        className="flex gap-3 items-center text-blue-500 hover:text-blue-700"
        href="/estudiantes"
      >
        <Undo2 /> <b>IR ATRAS</b>
      </Link>
      <Suspense
        fallback={
          <div className="skeleton h-32 w-full mt-4">
            CARGANDO DATOS DEL ESTUDIANTE
          </div>
        }
      >
        <Lista params={params} />
      </Suspense>
    </div>
  );
}

export default PaginaGrupo;

async function Lista({ params }) {
  const { id } = await params;
  const estudiante = await prisma.alumno.findUnique({ where: { id: +id } });

   if(!estudiante){
      redirect('/estudiantes');
    }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-4">
      <div className="flex justify-end">
        <Modal
          openButton={
            <div className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex gap-3 cursor-pointer">
              EDITAR ALUMNO <CopyPlus />
            </div>
          }
        >
          <form
            action={modificarAlumno}
            className="flex flex-col items-center justify-center mt-5 gap-3 p-5 border rounded shadow-lg"
          >
            <fieldset>EDITAR ALUMNO</fieldset>

            <input type="hidden" name="id" defaultValue={estudiante.id} />

            <input
              required
              className="border p-2 rounded w-full text-black"
              name="nombre"
              placeholder="Nombre"
              defaultValue={estudiante.nombre}
            />
            <input
              required
              className="border p-2 rounded w-full text-black"
              name="fechaNacimiento"
              type="date"
              defaultValue={
                new Date(estudiante.fechaNacimiento).toISOString().split("T")[0]
              }
            />
            <input
              type="file"
              className="border p-2 rounded w-full text-black"
              name="foto"
            />
            <input
              required
              className="border p-2 rounded w-full text-black"
              name="tutorLegal"
              placeholder="Tutor Legal"
              defaultValue={estudiante.tutorLegal}
            />
            <input
              required
              className="border p-2 rounded w-full text-black"
              name="grupoId"
              placeholder="ID del Grupo"
              defaultValue={estudiante.grupoId}
            />

            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              Insertar
            </button>
          </form>
        </Modal>
        <form action={eliminarAlumno}>
          <input type="hidden" name="id" defaultValue={estudiante.id} />
          <button className="bg-red-500 text-white w-auto px-4 py-2 rounded hover:bg-red-700 flex gap-3 cursor-pointer ml-2">
            ELIMINAR <Trash2 />
          </button>
        </form>
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Estudiante con Id {estudiante.id}
      </h1>
      <p className="text-lg text-gray-600 mb-2">
        <span className="font-semibold">Nombre:</span> {estudiante.nombre}
      </p>
      <p className="text-lg text-gray-600 mb-2">
        <span className="font-semibold">Fecha de Nacimiento:</span>{" "}
        {new Date(estudiante.fechaNacimiento).toLocaleDateString()}
      </p>
      {estudiante.foto && (
        <img
          src={estudiante.foto}
          alt="Foto del estudiante"
          className="mt-2 rounded-lg"
        />
      )}
      <p className="text-lg text-gray-600">
        <span className="font-semibold">Tutor Legal:</span>{" "}
        {estudiante.tutorLegal}
      </p>
    </div>
  );
}
