import Modal from "@/components/Modal";
import { eliminarGrupo, modificarGrupo } from "@/lib/actions";
import { PrismaClient } from "@prisma/client";
import { SquarePen, Trash2, Undo2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const prisma = new PrismaClient();

async function PaginaGrupo({ params }) {
  return (
    <div className="container mx-auto p-4">
      <Link
        className="flex gap-3 items-center text-blue-500 hover:text-blue-700"
        href="/grupos"
      >
        <Undo2 /> <b>IR ATRAS</b>
      </Link>
      <Suspense
        fallback={
          <div className="skeleton h-32 w-full mt-4">
            CARGANDO DATOS DEL GRUPO
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
  const { id } = params;
  const grupo = await prisma.grupo.findUnique({ where: { id: +id } });
  return (
    <>
      <div className="flex justify-end">
        <Modal
          openButton={
            <div className="bg-blue-500 text-white w-auto px-4 py-2 rounded hover:bg-blue-700 flex gap-3 cursor-pointer">
              MODIFICAR GRUPO <SquarePen />
            </div>
          }
        >
          <form
            action={modificarGrupo}
            className="flex flex-col items-center justify-center mt-5 gap-3 p-5 border rounded shadow-lg"
          >
            <fieldset>EDITAR GRUPO</fieldset>
            <input name="id" defaultValue={grupo.id} type="hidden" />
            <input
              required
              className="border p-2 rounded w-full text-black"
              name="nombre"
              defaultValue={grupo.nombre}
            />
            <input
              required
              className="border p-2 rounded w-full text-black"
              name="tutor"
              defaultValue={grupo.tutor}
            />
            <input
              required
              className="border p-2 rounded w-full text-black"
              name="aula"
              defaultValue={grupo.aula}
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              Modificar
            </button>
          </form>
        </Modal>

        <form action={eliminarGrupo}>
          <input type="hidden" name="id" defaultValue={id} />
          <button className="bg-red-500 text-white w-auto px-4 py-2 rounded hover:bg-red-700 flex gap-3 cursor-pointer ml-2">
            ELIMINAR <Trash2 />
          </button>
        </form>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mt-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Grupo con Id {grupo.id}
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          <span className="font-semibold">Nombre:</span> {grupo.nombre}
        </p>
        <p className="text-lg text-gray-600 mb-2">
          <span className="font-semibold">Tutor:</span> {grupo.tutor}
        </p>
        <p className="text-lg text-gray-600">
          <span className="font-semibold">Aula:</span> {grupo.aula}
        </p>
      </div>
    </>
  );
}
