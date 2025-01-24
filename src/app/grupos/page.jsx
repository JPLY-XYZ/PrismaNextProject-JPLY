import Modal from "@/components/Modal";
import { eliminarGrupo, insertarGrupo } from "@/lib/actions";
import { PrismaClient } from "@prisma/client";
import {
  CopyPlus,
  Home,
  MessageSquareShare,
  Trash,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const prisma = new PrismaClient();

async function PaginaGrupos() {
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
          <div className="skeleton h-32 w-full text-center mt-10">
            CARGANDO DATOS DE LOS GRUPOS
          </div>
        }
      >
        <Lista />
      </Suspense>
    </div>
  );
}

export default PaginaGrupos;

async function Lista() {
  const grupos = await prisma.grupo.findMany();

  return (
    <>
      <h1 className="text-3xl font-bold  mt-10">LISTA DE GRUPOS</h1>

      <Modal
        openButton={
          <div className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex gap-3 cursor-pointer">
            AÑADIR NUEVO GRUPO <CopyPlus />
          </div>
        }
      >
         
        <form
          action={insertarGrupo}
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
            name="tutor"
            placeholder="Tutor"
          />
          <input
            required
            className="border p-2 rounded w-full text-black"
            name="aula"
            placeholder="Aula"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Insertar
          </button>
        </form>
      </Modal>

      <table className="table-auto w-full mt-5 border-collapse border shadow-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border ">Nombre</th>
            <th className="px-4 py-2 border ">Tutor</th>
            <th className="px-4 py-2 border ">Aula</th>
            <th className="px-4 py-2 border ">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {grupos.map((grupo) => (
            <tr
              key={grupo.id}
              className="border hover:bg-purple-100 hover:text-black"
            >
              <td className="border px-4 py-2">{grupo.nombre}</td>
              <td className="border px-4 py-2">{grupo.tutor}</td>
              <td className="border px-4 py-2">{grupo.aula}</td>
              <td className="border px-4 py-2 text-center flex flex-col items-center gap-3">
                <Link
                  className="flex gap-3 justify-center text-blue-500 hover:text-black"
                  href={`/grupos/${grupo.id}`}
                >
                  VER <MessageSquareShare />
                </Link>
                <form action={eliminarGrupo}>
                  <input type="hidden" name="id" defaultValue={grupo.id} />
                  <button className="flex gap-3 justify-center text-red-500 hover:text-black">
                    ELIMINAR <Trash2 />
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
