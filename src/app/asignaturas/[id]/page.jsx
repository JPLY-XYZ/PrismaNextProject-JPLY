import Modal from "@/components/Modal";
import { eliminarAsignatura, modificarAsignatura } from "@/lib/actions";
import { PrismaClient } from "@prisma/client";
import { CopyPlus, Trash2, Undo2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";


const prisma = new PrismaClient();

async function PaginaAsignatura({ params }) {
  return (
    <div className="container mx-auto p-4">
      <Link className="flex gap-3 items-center text-blue-500 hover:text-blue-700" href="/asignaturas">
        <Undo2 /> <b>IR ATRAS</b>
      </Link>
      <Suspense fallback={<div className="skeleton h-32 w-full mt-4">CARGANDO DATOS DE LA ASIGNATURA</div>}>
        <Lista params={params} />
      </Suspense>
    </div>
  );
}

export default PaginaAsignatura;

async function Lista({ params }) {
  const { id } = params;
  const asignatura = await prisma.asignatura.findUnique({ where: { id: +id } });

   if(!asignatura){
        redirect('/asignaturas');
      }
  return (
    <>
      <div className="flex justify-end">
        <Modal
          openButton={
            <div className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex gap-3 cursor-pointer">
              EDITAR ASIGNATURA <CopyPlus />
            </div>
          }
        >
          <form
            action={modificarAsignatura}
            className="flex flex-col items-center justify-center mt-5 gap-3 p-5 border rounded shadow-lg"
          >
            <fieldset>EDITAR ASIGNATURA</fieldset>

            <input type="hidden" name="id" defaultValue={asignatura.id} />

            <input
              required
              className="border p-2 rounded w-full text-black"
              name="nombre"
              placeholder="Nombre"
              defaultValue={asignatura.nombre}
            />
            <input
              required
              className="border p-2 rounded w-full text-black"
              name="profesor"
              placeholder="Profesor"
              defaultValue={asignatura.profesor}
            />
            <input
              required
              className="border p-2 rounded w-full text-black"
              name="horas"
              type="number"
              placeholder="Horas"
              defaultValue={asignatura.horas}
            />

            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              Insertar
            </button>
          </form>
        </Modal>
        <form action={eliminarAsignatura}>
          <input type="hidden" name="id" defaultValue={asignatura.id} />
          <button className="bg-red-500 text-white w-auto px-4 py-2 rounded hover:bg-red-700 flex gap-3 cursor-pointer ml-2">
            ELIMINAR <Trash2 />
          </button>
        </form>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mt-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Asignatura: {asignatura.nombre}</h1>
        <p className="text-lg text-gray-600 mb-2"><span className="font-semibold">Profesor:</span> {asignatura.profesor}</p>
        <p className="text-lg text-gray-600"><span className="font-semibold">Horas:</span> {asignatura.horas}</p>
      </div>
    </>
  );
}
