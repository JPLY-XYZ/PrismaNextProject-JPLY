import Modal from "@/components/Modal";
import { eliminarAsignatura, insertarAsignatura } from "@/lib/actions";
import { PrismaClient } from "@prisma/client";
import { CircleX, CopyPlus, Home, MessageSquareShare, Trash2 } from "lucide-react";
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
    <>
      <Modal
        openButton={
          <div className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex gap-3 cursor-pointer">
            AÑADIR NUEVA ASIGNATURA <CopyPlus />
          </div>
        }
      >
        <form
          action={insertarAsignatura}
          className="flex flex-col items-center justify-center mt-5 gap-3 p-5 border rounded shadow-lg"
        >
          <fieldset>AÑADIR NUEVA ASIGNATURA</fieldset>
          <input
            required
            className="border p-2 rounded w-full text-black"
            name="nombre"
            placeholder="Nombre"
          />
          <input
            required
            className="border p-2 rounded w-full text-black"
            name="profesor"
            placeholder="Profesor"
          />
          <input
            required
            className="border p-2 rounded w-full text-black"
            name="horas"
            type="number"
            placeholder="Horas"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Insertar
          </button>
        </form>
      </Modal>

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
              <td className="border px-4 py-2 text-center flex flex-col items-center gap-3">
                <Link className="flex gap-3 justify-center text-blue-500 hover:text-black" href={`/asignaturas/${asignatura.id}`}>
                  VER <MessageSquareShare />
                </Link>
                <form action={eliminarAsignatura}>
                  <input type="hidden" name="id" defaultValue={asignatura.id} />
                  <button className="flex gap-3 justify-center text-red-500 hover:text-black">
                    ELIMINAR <Trash2 />
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {asignaturas.length === 0 && (
        <div className="flex mt-4 gap-4">
          <CircleX className="animate-pulse" />
          NO HAY DATOS PARA MOSTRAR <CircleX className="animate-pulse" />
        </div>
      )}
    </>
  );
}
