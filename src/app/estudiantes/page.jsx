import Modal from "@/components/Modal";
import { eliminarAlumno, insertarAlumno } from "@/lib/actions";
import { PrismaClient } from "@prisma/client";
import { CircleX, CopyPlus, Home, MessageSquareShare, Trash2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const prisma = new PrismaClient();

async function PaginaEstudiantes() {
  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <Link
        className="flex gap-3 m-auto text-blue-500 hover:text-blue-700"
        href="/"
      >
        <Home /> <b>IR AL INICIO</b>
      </Link>
      <Suspense
        fallback={
          <div className="skeleton h-32 mt-10 w-full text-center">
            CARGANDO DATOS DE LOS ESTUDIANTES
          </div>
        }
      >
        <Lista />
      </Suspense>
    </div>
  );
}

export default PaginaEstudiantes;

async function Lista() {
  const estudiantes = await prisma.alumno.findMany();

  return (
    <>
      <h1 className="text-3xl font-bold  mt-10">LISTA DE ALUMNOS</h1>

      <Modal
        openButton={
          <div className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex gap-3 cursor-pointer">
            AÑADIR NUEVO ALUMNO <CopyPlus />
          </div>
        }
      >
        <form
          action={insertarAlumno}
          className="flex flex-col items-center justify-center mt-5 gap-3 p-5 border rounded shadow-lg"
        >
          <fieldset>AÑADIR NUEVO GRUPO</fieldset>
          <input
            required
            className="border p-2 rounded w-full text-black"
            name="nombre"
            placeholder="Nombre"
          />
          <input
            required
            className="border p-2 rounded w-full text-black"
            name="fechaNacimiento"
            type="date"
          />
          <input
            required
            type="file"
            className="border p-2 rounded w-full text-black"
            name="foto"
            placeholder="URL de la Foto"
          />
          <input
            required
            className="border p-2 rounded w-full text-black"
            name="tutorLegal"
            placeholder="Tutor Legal"
          />
          <input
            required
            className="border p-2 rounded w-full text-black"
            name="grupoId"
            placeholder="ID del Grupo"
          />


          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Insertar
          </button>
        </form>
      </Modal>


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
              <td className="border px-4 py-2">
                {new Date(estudiante.fechaNacimiento).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2">{estudiante.tutorLegal}</td>
              <td className="border px-4 py-2 text-center flex flex-col items-center gap-3">
                <Link
                  className="flex gap-3 justify-center text-blue-500 hover:text-black"
                  href={`/estudiantes/${estudiante.id}`}
                >
                  VER <MessageSquareShare />
                </Link>
                <form action={eliminarAlumno}>
                  <input type="hidden" name="id" defaultValue={estudiante.id} />
                  <button className="flex gap-3 justify-center text-red-500 hover:text-black">
                    ELIMINAR <Trash2 />
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {estudiantes.length === 0 && (
        <div className="flex mt-4 gap-4">
          <CircleX className="animate-pulse" />
          NO HAY DATOS PARA MOSTRAR <CircleX className="animate-pulse" />
        </div>
      )}
    </>
  );
}
